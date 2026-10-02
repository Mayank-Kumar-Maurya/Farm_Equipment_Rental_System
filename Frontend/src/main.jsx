import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ServerProvider from "./Context/ServerProvider.jsx";
import Home from "./Components/Home.jsx";
import AuthPage from "./Components/Pages/AuthPage.jsx";
import AddEquipmentPage from "./Components/Pages/AddEquipmentPage.jsx";
import Logout from "./Components/Pages/Logout.jsx";
import ProductDetail from "./Components/Pages/ProductDetail";
import MyProfile from "./Components/Pages/MyProfile.jsx";
import SearchResults from "./Components/Pages/SearchResult.jsx";
import EditEquipment from "./Components/Pages/EditEquipment.jsx";
import MyEquipment from "./Components/Pages/MyEquipment.jsx";
import AboutPage from "./Components/Pages/AboutPage.jsx";
import ContactPage from "./Components/Pages/ContactPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ServerProvider>
        <App />
      </ServerProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <AuthPage />,
      },
      {
        path: "/login",
        element: <AuthPage />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/addEquipments",
        element: <AddEquipmentPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/about",
        element: <AboutPage/>,
      },
      {
        path: "/contact",
        element: <ContactPage/>,
      },
      {
        path: "/search-results",
        element: <SearchResults />,
      },
      {
        path: "/my-profile",
        element: <MyProfile />,
      },
      {
        path: "/my-equipment",
        element: <MyEquipment />,
      },
      {
        path: "/edit-equipment/:id",
        element: <EditEquipment />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
