import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Login.jsx";
import Products from "./Products.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { Routes, Route } from "react-router-dom";
import Main from "./layouts/pages/Main.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Main>
              <Login />
            </Main>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Main>
                <Products />
              </Main>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
