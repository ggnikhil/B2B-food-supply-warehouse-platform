import {
    House, Users, ClipboardCheck, TriangleAlert, BookOpen, ListTodo,
    Boxes, ShoppingCart, ArrowDownToLine, IndianRupee, LayoutDashboard,
    UserCog, Settings,UserPlus
} from "lucide-react";

// Naya module jodna ho to yahan ek item badhao
// (warehouse.routes.jsx me route jodo, phir comingSoon hata do)
export const sidebarMenu = [
    { label: "Home", path: "/warehouse", end: true, icon: House },
    { label: "Buyer Accounts", path: "/warehouse/buyer-accounts", icon: Users },
    { label: "Picking & Checking", path: "/warehouse/picking-checking", icon: ClipboardCheck },
    { label: "Issue Tracking", path: "/warehouse/issue-tracking", icon: TriangleAlert },
    { label: "Catalogue", path: "/warehouse/catalogue", icon: BookOpen },
    { label: "SCM Task Management", path: "/warehouse/scm-tasks", icon: ListTodo },
    { label: "Inventory", path: "/warehouse/inventory", icon: Boxes },
    { label: "Orders", path: "/warehouse/orders", icon: ShoppingCart },
    { label: "Inbound", path: "/warehouse/inbound", icon: ArrowDownToLine },
    { label: "Finance", path: "/warehouse/finance", icon: IndianRupee },
    { label: "Dashboard", path: "/warehouse/dashboard", icon: LayoutDashboard },
    { label: "Workforce Management", path: "/warehouse/workforce", icon: UserCog },
    { label: "Settings", path: "/warehouse/settings", icon: Settings },
    { label: "Add User", path: "/warehouse/register", icon: UserPlus}
];