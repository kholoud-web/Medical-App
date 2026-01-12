export const BASE_URL = "http://diagnosis.runasp.net"


export const API ={
    // Auth
    Login: `${BASE_URL}/Auth/Login`,
    ForgotPassword: `${BASE_URL}/Auth/forget-password`,
    ResetPassword: `${BASE_URL}/Auth/reset-password`,
   ConfirmEmail: `${BASE_URL}/Auth/confirm-email`,

    
    // drug checker
    CheckDrugChecker: `${BASE_URL}/DrugChecker/check`,
    GetDrugChecker: (keyword) =>
    `${BASE_URL}/DrugChecker/suggestions?keyword=${keyword}`,
}

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.warn('No authentication token found. Please login first.');
  }
  
  return {
    Authorization: `Bearer ${token}`
  };
};