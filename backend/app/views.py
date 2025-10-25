from django.shortcuts import render
import json
from django.views import View
from django.http import JsonResponse, HttpResponse
from .models import Product, Category


# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def product_to_dict(product):
    return {
        "id": product.id,
        "name": product.name,
        "price": float(product.price),
        "description": product.description,
        "category": {"id": product.category.id, "name": product.category.name}
    }

class ProductView(View):
    def get(self, request, product_id=None):
        if product_id:
            try:
                product = Product.objects.get(id=product_id)
                return JsonResponse(product_to_dict(product))
            except Product.DoesNotExist:
                return JsonResponse({"error": "Product not found"}, status=404)
        else:
            products = Product.objects.all()
            data = [product_to_dict(p) for p in products]
            return JsonResponse(data, safe=False)

    def post(self, request):
        try:
            body = json.loads(request.body)
            category_id = body.get("category_id")
            category = Category.objects.get(id=category_id)
            product = Product.objects.create(
                name=body.get("name"),
                price=body.get("price"),
                description=body.get("description", ""),
                category=category
            )
            return JsonResponse(product_to_dict(product), status=201)
        except Category.DoesNotExist:
            return JsonResponse({"error": "Category not found"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    def put(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            body = json.loads(request.body)
            if "name" in body:
                product.name = body["name"]
            if "price" in body:
                product.price = body["price"]
            if "description" in body:
                product.description = body["description"]
            if "category_id" in body:
                category = Category.objects.get(id=body["category_id"])
                product.category = category
            product.save()
            return JsonResponse(product_to_dict(product))
        except Product.DoesNotExist:
            return JsonResponse({"error": "Product not found"}, status=404)
        except Category.DoesNotExist:
            return JsonResponse({"error": "Category not found"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    def delete(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            product.delete()
            return JsonResponse({"message": "Product deleted"})
        except Product.DoesNotExist:
            return JsonResponse({"error": "Product not found"}, status=404)