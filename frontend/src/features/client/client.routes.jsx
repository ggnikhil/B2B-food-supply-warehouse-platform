import ClientLayout from "./clientLayout/pages/ClientLayout";
import Login from "./auth/pages/login";
import { Children } from "react";
import Homepage from "./home/pages/Homepage.jsx";

export const clientRoutes = [
    {
        path:"/login",
        element:<Login />
    },

    {
        path:"/",
        element:<ClientLayout />,
        children:[
            {
                index:true,
                element:<Homepage />
            }
        ]
    }
]