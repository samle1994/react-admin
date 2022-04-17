const Menu = () => {
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="/" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
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
                <a href="/" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Bảng điều khiển</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/#" className="nav-link">
                  <i className="nav-icon fas fa-shopping-bag"></i>
                  <p>
                    Quản lý Sản phẩm
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="../mailbox/mailbox.html" className="nav-link">
                      <i className="fa fa-chevron-circle-right nav-icon"></i>
                      <p>Danh mục cấp 1</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../mailbox/compose.html" className="nav-link">
                      <i className="fa fa-chevron-circle-right nav-icon"></i>
                      <p>Danh mục cấp 2</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../mailbox/read-mail.html" className="nav-link">
                      <i className="fa fa-chevron-circle-right nav-icon"></i>
                      <p>Sản phẩm</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="/#" className="nav-link">
                  <i className="nav-icon fas fa-newspaper"></i>
                  <p>
                    Quản lý Tin tức
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="../mailbox/mailbox.html" className="nav-link">
                      <i className="fa fa-chevron-circle-right nav-icon"></i>
                      <p> Tin tức</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="/#" className="nav-link">
                  <i className="nav-icon fas fa-cogs"></i>
                  <p>
                    Cấu hình chung
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="../mailbox/mailbox.html" className="nav-link">
                      <i className="fa fa-chevron-circle-right nav-icon"></i>
                      <p> Cấu hình website</p>
                    </a>
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
