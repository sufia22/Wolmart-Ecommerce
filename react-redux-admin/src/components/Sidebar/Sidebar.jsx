import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuthUser();
  console.log(user);

  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              {user?.role?.permissions?.includes("Dashboard") && (
                <li className={`${location.pathname === "/" ? "active" : ""}`}>
                  <Link to={"/"}>
                    <i className="fe fe-home"></i> <span>Dashboard</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Orders") && (
                <li className="">
                  <Link to={"/users"}>
                    <i className="fe fe-bolt"></i> <span>Orders</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Products") && (
                <li className="">
                  <Link to={"/users"}>
                    <i className="fa fa-product-hunt"></i>{" "}
                    <span>Products </span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Categories") && (
                <li className="">
                  <Link to={"/users"}>
                    <i className="fa fa-product-hunt"></i>
                    <span>Categories</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Tags") && (
                <li className="">
                  <Link to={"/users"}>
                    <i className="fe fe-tag"></i> <span>Tags</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Brands") && (
                <li className="">
                  <Link to={"/users"}>
                    <i className="fa fa-bandcamp"></i> <span>Brands</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Users") && (
                <li
                  className={`${
                    location.pathname === "/users" ? "active" : ""
                  }`}
                >
                  <Link to={"/users"}>
                    <i className="fe fe-user"></i> <span>Users</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Roles") && (
                <li
                  className={`${
                    location.pathname === "/roles" ? "active" : ""
                  }`}
                >
                  <Link to={"/role"}>
                    <i className="fa fa-anchor"></i> <span>Roles</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Permissions") && (
                <li
                  className={`${
                    location.pathname === "/permissions" ? "active" : ""
                  }`}
                >
                  <Link to={"/permission"}>
                    <i className="fa fa-lock"></i> <span>Permissions</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
