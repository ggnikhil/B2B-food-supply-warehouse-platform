import { NavLink } from "react-router";
import { sidebarMenu } from "../sidebarMenu";
import "../style/sidebar.scss";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-menu">
        {sidebarMenu.map(({ label, path, end, icon: Icon }) => (
          <div className="sidebar-menu-item" key={path}>

            <NavLink to={path} end={end} className="sidebar-item">
              <Icon className="sidebar-icon" size={14} />
              <span className="sidebar-label">{label}</span>
            </NavLink>

          </div>
        ))}
      </nav>
    </aside>
  );
}