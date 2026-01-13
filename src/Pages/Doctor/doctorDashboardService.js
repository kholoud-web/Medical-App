import axios from "axios";

const API_URL = "http://diagnosis.runasp.net";


export const getDoctorDashboard = async () => {
  const token = localStorage.getItem("token");

    //  التحقق إذا كان التوكن موجود أصلاً قبل إرسال الطلب
    if (!token) {
      console.error("No token found! Please login first.");
      return null;
    }
  const response = await axios.get(`${API_URL}/DoctorDashboard`,{
    headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
