import { createBrowserRouter } from "react-router";
import { warehouseRoutes } from "../features/warehouse/warehouse.routes.jsx";
import { clientRoutes } from "../features/client/client.routes.jsx";

export const routes = createBrowserRouter([
    ...clientRoutes,
    
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
