import { Link, NavLink, useLocation } from "react-router-dom";
const logo = require("./../../AdminLTELogo.png");

const Menu = () => {
  const params = useLocation();
  let com = params.pathname.split("/")[1];
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="/" className="brand-link">
          <img
            src={logo}
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">Admin</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
       with font-awesome or any other icon font library */}
              <li className="nav-item menu-open">
                <NavLink className="nav-link" to="/">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Bảng điều khiển</p>
                </NavLink>
              </li>
              <li
                className={`nav-item ${
                  com === "productlist" ||
                  com === "productcat" ||
                  com === "product"
                    ? "menu-is-opening menu-open"
                    : ""
                } `}
              >
                <a href="/" className="nav-link">
                  <i className="nav-icon fas fa-shopping-bag"></i>
                  <p>
                    Quản lý Sản phẩm
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>

                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/productlist">
                      <i className="fa fa-chevron-circle-right nav-icon"></i>
                      <p>Danh mục cấp 1</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/productcat">
                      <i className="fa fa-chevron-circle-right nav-icon"></i>
                      <p>Danh mục cấp 2</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/product">
                      <i className="fa fa-chevron-circle-right nav-icon"></i>
                      <p>Sản phẩm</p>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li
                className={`nav-item ${
                  com === "news" ? "menu-is-opening menu-open" : ""
                }`}
              >
                <a href="/" className="nav-link">
                  <i className="nav-icon fas fa-newspaper"></i>
                  <p>
                    Quản lý Tin tức
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/news">
                      <i className="fa fa-chevron-circle-right nav-icon"></i>
                      <p>Tin tức</p>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li
                className={`nav-item ${
                  com === "photo" ? "menu-is-opening menu-open" : ""
                }`}
              >
                <a href="/" className="nav-link">
                  <i className="nav-icon fas fa-photo-video"></i>
                  <p>
                    Hình ảnh
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/photo/logo">
                      <i className="fa fa-chevron-circle-right nav-icon"></i>
                      <p>Quản lý Logo</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/photo/bannerseller">
                      <i className="fa fa-chevron-circle-right nav-icon"></i>
                      <p>Quản lý Banner Seller</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/photo/bannersaleoff">
                      <i className="fa fa-chevron-circle-right nav-icon"></i>
                      <p>Quản lý Banner Sale off</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/photo/bannerqc">
                      <i className="fa fa-chevron-circle-right nav-icon"></i>
                      <p>Quản lý Banner QC</p>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li
                className={`nav-item ${
                  com === "setting" ? "menu-is-opening menu-open" : ""
                }`}
              >
                <a href="/" className="nav-link">
                  <i className="nav-icon fas fa-cogs"></i>
                  <p>
                    Cấu hình chung
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/setting/1">
                      <i className="fa fa-chevron-circle-right nav-icon"></i>
                      <p>Cấu hình website</p>
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </>
  );
};

export default Menu;
