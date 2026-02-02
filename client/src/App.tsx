import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Dashboard from "./pages/dashboard";
import Shoes from "./pages/shoes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/shoes",
    element: <Shoes />
  }
])

const App: React.FC = () => {
  return <RouterProvider router={router} />
}

export default App;