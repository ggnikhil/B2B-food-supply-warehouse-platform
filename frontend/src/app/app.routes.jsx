import { createBrowserRouter } from "react-router";
import { warehouseRoutes } from "../features/warehouse/warehouse.routes.jsx";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <div>HPSCM Home</div>,
    },
    ...warehouseRoutes,

    {
        path: "/admin",
        children: []
    },

    {
        path: "/client",
        children: []
    }
])
