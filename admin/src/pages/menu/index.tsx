import { MenuProps, Menu as AntdMenu } from "antd";
import { Outlet } from "react-router-dom";
import "./index.css";
const items: MenuProps["items"] = [
  {
    key: "1",
    label: "会议室管理",
  },
  {
    key: "2",
    label: "预订管理",
  },
  {
    key: "3",
    label: "用户管理",
  },
  {
    key: "4",
    label: "统计",
  },
];
export default function Menu() {
  return (
    <div id="menu-container">
      <div className="menu-area">
        <AntdMenu defaultSelectedKeys={["3"]} items={items} />
      </div>
      <div className="content-area">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
