import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";

function SidebarContent({ products }) {
  return (
    <>
      <div class="flex p-2">
        <div class="w-max rounded pr-4">
          <Sidebar />
        </div>

        <div class="w-full rounded">
          <Content products={products} />
        </div>
      </div>
    </>
  );
}

export default SidebarContent;
