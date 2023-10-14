import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import ErrorPage from "../pages/Error";
import Albums from "../pages/Albums";
import Home from "../pages/Home";

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
          // element: <Albums />,
          lazy: () => import("../pages/Albums"),
        },
        {
          path: "/",
          element: defaultNav(),
        },
        {
          path: "*",
          element: defaultNav(),
        },
      ]
    }
  ]);
}

function defaultNav() {
  return <Navigate to="/home" />;
}

export default AppRouter;