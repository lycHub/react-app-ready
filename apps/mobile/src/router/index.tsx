import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import ErrorPage from "../pages/Error";
import Home from "../pages/Home";

export const HomePath = '/home';

function AppRouter() {
  /* useEffect(() => {
    console.log('app router run')
  }, []) */
  return createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "posts",
          lazy: () => import("../pages/Posts"),
          /* loader: async () => {
            console.log('run>> 1')
            return null;
          } */
        },
        {
          path: "post/:id",
          lazy: () => import("../pages/PostDetail"),
        },
        {
          path: "albums",
          lazy: () => import("../pages/Albums"),
        },
        {
          path: "forms",
          lazy: () => import("../pages/Forms"),
        },
        {
          path: "motion",
          lazy: () => import("../pages/Motion"),
        },
        {
          path: "no-access",
          lazy: () => import("../pages/NoAccess"),
        },
        {
          path: "",
          element: <Navigate to={HomePath} />,
        },
        {
          path: "*",
          lazy: () => import("../pages/NotFound"),
        },
      ]
    }
  ]);
}

export default AppRouter;