import Admin from "./pages/Admin/Admin";
import Admin1Page from "./pages/Admin/Admin1Page";
import Basket from "./pages/Basket";
import Shop from "./pages/Farkop/Shop";
import FarkopPage from "./pages/Farkop/FarkopPage";
import Auth from "./pages/Auth";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  SHOP_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  FARKOP_ROUTE,
  WK_ROUTE,
  AC_ROUTE, ADMIN_1_ROUTE, MAIL_SENDER_ROUTE,
} from "./utils/const";
import WiringKit from "./pages/WiringKit/WiringKit";
import Accessory from "./pages/Accessory/Accessory";
import WKPage from "./pages/WiringKit/WKPage";
import MailSender from "./components/MailSender";

export const authRotes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: ADMIN_1_ROUTE,
    Component: Admin1Page,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: WK_ROUTE,
    Component: WiringKit,
  },
  {
    path: AC_ROUTE,
    Component: Accessory,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: MAIL_SENDER_ROUTE,
    Component: MailSender,
  },
  {
    path: FARKOP_ROUTE + "/:id",
    Component: FarkopPage,
  },
  {
    path: WK_ROUTE + "/:id",
    Component: WKPage,
  },
];
