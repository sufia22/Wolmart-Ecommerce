import PageLayout from "../components/PageLayout/PageLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Permission from "../pages/permission/permission";
import Role from "../pages/role/Role";
import User from "../pages/user/User";
import PrivateGard from "./PrivateGard";

// create private router
const privateRouter = [
  {
    element: <PageLayout />,
    children: [
      {
        element: <PrivateGard />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <User />,
          },
          {
            path: "/role",
            element: <Role />,
          },
          {
            path: "/permission",
            element: <Permission />,
          },
        ],
      },
    ],
  },
];

// export private router
export default privateRouter;
