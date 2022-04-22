import { useDispatch, useSelector } from "react-redux";
import ActionTypes from "./../../store/actions";
const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: ActionTypes.lOGOUT_USER,
    });
  };
  const userInfo = useSelector((state) => state.auth.currentUser);
  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="/#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/" className="nav-link">
              Xin chào {userInfo.name}
            </a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item d-sm-inline-block">
            <a href="../" target="_blank" className="nav-link">
              <i className="fas fa-reply"></i>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="/#">
              <i className="far fa-bell" />
              <span className="badge badge-warning navbar-badge">4</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">4 Thông báo</span>
              <div className="dropdown-divider" />
              <a href="/#" className="dropdown-item">
                <i className="fas fa-envelope mr-2" /> 4 đơn hàng
                <span className="float-right text-muted text-sm">3 mins</span>
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="/#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
          <li className="nav-item d-sm-inline-block">
            <a href="/" onClick={handleLogout} className="nav-link">
              <i className="fas fa-sign-out-alt mr-1"></i>Đăng xuất
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
