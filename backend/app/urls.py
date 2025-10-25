from . import views
from django.urls import path
urlpatterns = [
    path('', views.index, name='index'),
    path('products/', views.ProductView.as_view(), name='product-list'),  # GET all, POST new
    path('products/<int:product_id>/', views.ProductView.as_view(), name='product-detail'),  # GET one, PUT, DELETE
]