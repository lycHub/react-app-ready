import { Navigate, createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import ErrorPage from "../pages/Error";
import Home from "../pages/Home";
import { MaskBg } from "@app-ready/libs";

export const HomePath = "/home";

function AppRouter() {
  /* useEffect(() => {
    console.log('app router run')
  }, []) */
  return createBrowserRouter(
    [
      {
        path: "/",
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        hydrateFallbackElement: <MaskBg className="center" />,
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
        ],
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_fetcherPersist: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );
}

export default AppRouter;
