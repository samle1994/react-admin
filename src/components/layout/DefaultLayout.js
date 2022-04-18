import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
import routes from "./../../routes";
import { useSelector } from "react-redux";
const DefaultLayout = () => {
  const isLoggedIn = true; //useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      {!isLoggedIn ? (
        <Navigate to="/login" />
      ) : (
        <>
          <div className="wrapper">
            <Header />
            <Menu />
            <Routes>
              {routes.map((route, idx) => (
                <Route key={idx} path={route.path} element={route.component} />
              ))}
            </Routes>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default DefaultLayout;
