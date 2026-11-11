import WarehouseLayout from "./warehouseLayout/pages/WarehouseLayout";
import Register from "./auth/pages/Register";
import Login from "./auth/pages/Login";
import Inventory from "./inventory/pages/inventory";
import Home from "./warehouseLayout/pages/home";

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
                index:true,
                element:<Home />,
                handle:{
                    title:"Home"
                }
            },
            {
                path: "register",
                element: <Register />,
                handle:{
                    title:"Register User"
                }
            },
            {
                path:"inventory",
                element:<Inventory />,
                handle:{
                    title:"Inventory Mangement"
                }
            }
        ]
    }
]