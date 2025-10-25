import React from "react";
import Header from "./Header";
import Footer from "./Footer";
function Main({ children }) {
  return (
    <>
      <Header/>
      <main className="main-container">{children}</main>
      <Footer />
    </>
  );
}

export default Main;
