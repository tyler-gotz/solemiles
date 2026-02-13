import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Dashboard from "./pages/dashboard";
import Shoes from "./pages/shoes";
import AddShoe from "./pages/add-shoe";
import ShoeDetail from "./pages/shoe-detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/shoes",
    element: <Shoes />
  },
  {
    path: "/shoes/:id",
    element: <ShoeDetail />
  },
  {
    path: "/shoes/new",
    element: <AddShoe />
  }
])

const App: React.FC = () => {
  return <RouterProvider router={router} />
}

export default App;