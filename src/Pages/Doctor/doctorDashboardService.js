import axios from "axios";

const API_URL = "http://diagnosis.runasp.net";
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getDoctorDashboard = async () => {
  const response = await axios.get(
    `${API_URL}/api/DoctorDashboard`,
    getAuthHeader()
  );
  return response.data;
};
