import { UserOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import "./index.css";
export default function Index() {
  return (
    <div id="index-container">
      <div className="header">
        <Link to="/" className="sys_name">
          <h1>会议室预订系统-后台管理</h1>
        </Link>
        <Link to="/user/info_modify" className="info_modify">
          <UserOutlined className="icon" />
        </Link>
      </div>
      <div className="body">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
