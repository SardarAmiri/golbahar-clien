import { BookCheck, Home, List, LogOut, User, UsersRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { message } from "antd";
import userGlobalStore, { UsersStoreType } from "../../store/user-store";
function MenuItems() {
  const iconSize = 16;

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { currentUser }: UsersStoreType = userGlobalStore() as UsersStoreType;
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={iconSize} />,
      isActive: currentPath === "/",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={iconSize} />,
      isActive: currentPath === "/profile",
    },
    {
      name: "Bookings",
      path: "/profile/bookings",
      icon: <List size={iconSize} />,
      isActive: currentPath === "/profile/bookings",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <LogOut size={iconSize} />,
    },
  ];
  const staffMenu = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={iconSize} />,
      isActive: currentPath === "/",
    },
    {
      name: "Events",
      path: "/staff/events",
      icon: <List size={iconSize} />,
      isActive: currentPath.includes("/staff/events"),
    },
    {
      name: "Bookings",
      path: "/staff/bookings",
      icon: <BookCheck size={iconSize} />,
      isActive: currentPath.includes("/staff/bookings"),
    },
    {
      name: "Users",
      path: "/staff/users",
      icon: <UsersRound size={iconSize} />,
      isActive: currentPath.includes("/staff/users"),
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <LogOut size={iconSize} />,
    },
  ];
  const menuToRender = currentUser?.isStaff ? staffMenu : userMenu;

  const onLogout = () => {
    Cookies.remove("token");
    navigate("/login");
    message.success("Logged out successfully");
  };
  return (
    <div className="lg:bg-gray-200 h-full p-5 w-full">
      <div className="flex flex-col gap-1 mt-5">
        <h1 className="text-2xl font-bold text-info">
          Event <b className="text-primary font-bold">Platform</b>
        </h1>
        <span className="text-sm text-gray-600 ">{currentUser?.name}</span>
      </div>
      <div className="flex flex-col gap-10 mt-20">
        {menuToRender.map((item: any) => (
          <div
            className={`cursor-pointer px-5 py-3 rounded flex gap-5 text-sm items-center ${
              item.isActive ? "bg-info text-white" : ""
            }`}
            key={item.name}
            onClick={() => {
              if (item.name === "Logout") {
                onLogout();
              } else {
                navigate(item.path);
              }
            }}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItems;
