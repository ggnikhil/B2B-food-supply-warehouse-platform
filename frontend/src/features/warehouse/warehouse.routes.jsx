import WarehouseLayout from "./warehouseLayout/pages/WarehouseLayout";
import Register from "./auth/pages/Register";
import Login from "./auth/pages/Login";
import Inventory from "./inventory/pages/inventory";

export const warehouseRoutes = [
    {
        path: "/warehouse/login",
        element: <Login />
    },
    {
        path: "/warehouse",
        element: <WarehouseLayout />,
        children: [
            {
                path: "register",
                element: <Register />
            },
            {
                path:"inventory",
                element:<Inventory />
            }
        ]
    }
]