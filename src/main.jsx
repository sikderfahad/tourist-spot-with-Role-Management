import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layout/Root.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/SignUp.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import MyList from "./pages/myList/MyList.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import AddTouristSpot from "./pages/addTouristSpot/AddTouristSpot.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllTouristSpot from "./pages/allTouristSpot/AllTouristSpot.jsx";
import ViewDetails from "./pages/viewDetails/ViewDetails.jsx";
import UpdateTouristSpot from "./pages/updateTouristSpot/UpdateTouristSpot.jsx";

// export const SERVER_BASE_URL = "http://localhost:3000";
export const SERVER_BASE_URL = "https://tourist-server-zeta.vercel.app";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
      {
        path: "my-list",
        element: (
          <PrivateRoute allowedRoles={["user", "admin"]}>
            <MyList />
          </PrivateRoute>
        ),
      },
      {
        path: "add-tourist-spot",
        element: (
          <PrivateRoute allowedRoles={["admin", "user"]}>
            <AddTouristSpot />
          </PrivateRoute>
        ),
      },
      {
        path: "update-tourist-spot/:id",
        element: (
          <PrivateRoute allowedRoles={["admin", "user"]}>
            <UpdateTouristSpot />
          </PrivateRoute>
        ),
        // loader: ({ params }) => fetchSpotDetails(params.id),
      },
      {
        path: "view-spot-details/:id",
        element: (
          <PrivateRoute allowedRoles={["admin", "user"]}>
            <ViewDetails />
          </PrivateRoute>
        ),
        // loader: ({ params }) => fetchSpotDetails(params.id),
      },
      {
        path: "all-tourist-spot",
        element: <AllTouristSpot />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
);
