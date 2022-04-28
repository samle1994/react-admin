import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Nointernet from "./components/pages/Nointernet";
import Nopermission from "./components/pages/Nopermission";
import ProductList from "./components/pages/product/ProductList";
import ProductListEdit from "./components/pages/product/ProductListEdit";
import ProductCat from "./components/pages/product/ProductCat";
import ProductCatEdit from "./components/pages/product/ProductCatEdit";
import Product from "./components/pages/product/Product";
import ProductEdit from "./components/pages/product/ProductEdit";
import News from "./components/pages/news/News";
import NewsEdit from "./components/pages/news/NewsEdit";
import Setting from "./components/pages/setting/Setting";
import Photo from "./components/pages/photo/Photo";
import Photos from "./components/pages/photos/Photos";
import PhotosEdit from "./components/pages/photos/PhotosEdit";

const routes = [
  {
    path: "",
    component: <Home />,
  },
  {
    path: "home",
    component: <Home />,
  },
  {
    path: "productlist",
    component: <ProductList />,
  },
  {
    path: "productlist/:id",
    component: <ProductListEdit />,
  },
  {
    path: "productcat",
    component: <ProductCat />,
  },
  {
    path: "productcat/:id",
    component: <ProductCatEdit />,
  },
  {
    path: "product",
    component: <Product />,
  },
  {
    path: "product/:id",
    component: <ProductEdit />,
  },
  {
    path: "news",
    component: <News />,
  },
  {
    path: "news/:id",
    component: <NewsEdit />,
  },
  {
    path: "setting/:id",
    component: <Setting />,
  },
  {
    path: "photo/:type",
    component: <Photo />,
  },
  {
    path: "photos/:type",
    component: <Photos />,
  },
  {
    path: "photos/:type/:id",
    component: <PhotosEdit />,
  },
  {
    path: "no-internet",
    component: <Nointernet />,
  },
  {
    path: "no-permission",
    component: <Nopermission />,
  },
  {
    path: "*",
    component: <NotFound />,
  },
];
export default routes;
