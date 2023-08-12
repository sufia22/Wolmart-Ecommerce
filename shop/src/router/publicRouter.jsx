import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
import SingleShop from "../pages/shop/SingleShop";

// create public router
const publicRouter = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/shop/:id",
    element: <SingleShop />,
  },
];

// export public router
export default publicRouter;
