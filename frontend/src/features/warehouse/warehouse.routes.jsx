import WarehouseLayout from "./warehouseLayout/pages/WarehouseLayout";
import Register from "./auth/pages/Register";
import Login from "./auth/pages/Login";

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
            }
        ]
    }
]