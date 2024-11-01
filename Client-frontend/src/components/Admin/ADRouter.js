import { Navigate } from "react-router-dom";
import Error from "../Error";
import { AdminLayout } from "./FullLayoutAdmin";
import Statistics from "../Sidebar Pages/Statistics";
import Users from "../Sidebar Pages/Users";
import { PrivateRouteUser } from "./PrivateRouteAdmin";
export const ThemeRoutes = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "/", element: <Navigate to="starter" /> },
      { path: "starter", exact: true, element: <PrivateRouteUser element={<Statistics />} /> },
      { path: 'users', exact: true, element: <PrivateRouteUser element={<Users />} /> },
      { path: "*", exact: true, element: <Error /> },
    ],
  },
];


