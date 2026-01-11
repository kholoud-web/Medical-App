import axiosInstance from "../Api/axiosInstance";

// جلب بيانات البروفايل
export const getProfile = () => axiosInstance.get("/Settings/profile");

// تعديل بيانات البروفايل
export const updateProfile = (data) =>
  axiosInstance.put("/Settings/profile", data);

// جلب الإعدادات
export const getUserSettings = () =>
  axiosInstance.get("/Settings/user-settings");

// تعديل الإعدادات
export const updateUserSettings = (data) =>
  axiosInstance.put("/Settings/user-settings", data);

export const changePassword = (data) =>
  axiosInstance.post("/Auth/change-password", data);
