import { EditProduct, Home, NotFound } from "../pages";

export default [
  {
    path: ["/home", "/"],
    exact: true,
    component: () => {
      return (<Home isHome />);
    },
  },
  {
    path: "/admin",
    component: Home,
    exact: true,
  },
  {
    path: "/admin/edit/:id",
    component: EditProduct,
  },
  {
    path: ["*"],
    exact: true,
    component: NotFound,
  },
];
