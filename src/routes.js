import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Nointernet from "./components/pages/Nointernet";
import Nopermission from "./components/pages/Nopermission";
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
