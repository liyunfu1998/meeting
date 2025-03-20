import { RegisterUser } from "../pages/register";
import { UpdatePassword } from "../pages/update-password";
import { UserInfo } from "../pages/update_info";
import { axiosInstance } from "./request";

export async function login(username: string, password: string) {
  return await axiosInstance.post("/user/login", {
    username,
    password,
  });
}

export async function registerCaptcha(email: string) {
  return await axiosInstance.get("/user/register-captcha", {
    params: {
      address: email,
    },
  });
}

export async function register(registerUser: RegisterUser) {
  return await axiosInstance.post("/user/register", registerUser);
}

export async function updatePasswordCaptcha(email: string) {
  return await axiosInstance.get("/user/update_password/captcha", {
    params: {
      address: email,
    },
  });
}

export async function updatePassword(data: UpdatePassword) {
  return await axiosInstance.post("/user/update_password", data);
}

export async function getUserInfo() {
  return await axiosInstance.get("/user/info");
}

export async function updateInfo(data: UserInfo) {
  return await axiosInstance.post("/user/update", data);
}

export async function updateUserInfoCaptcha() {
  return await axiosInstance.get("/user/update/captcha");
}

export async function searchMeetingRoomList(
  name: string,
  capacity: number,
  equipment: string,
  pageNo: number,
  pageSize: number
) {
  return await axiosInstance.get("/meeting-room/list", {
    params: {
      name,
      capacity,
      equipment,
      pageNo,
      pageSize,
    },
  });
}