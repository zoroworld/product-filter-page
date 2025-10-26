import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import ProductProvider from "../../context/ProductContext";

function SidebarContent({ products}) {
  return (
    <>
      <div className="flex p-2">
        <ProductProvider products={products}>
          <div className="w-max rounded pr-4">
            <Sidebar />
          </div>

          <div className="w-full rounded">
            <Content />
          </div>
        </ProductProvider>
      </div>
    </>
  );
}

export default SidebarContent;
