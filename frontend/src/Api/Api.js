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

    // system setting
    doctorRateLimit: `${BASE_URL}/SystemSettings/doctor/rate-limit`,
    doctorWorkHours:`${BASE_URL}/SystemSettings/doctor/work-hours`,
    aiRate:`${BASE_URL}/SystemSettings/ai/rate-limit`,
    aiToggle:`${BASE_URL}/SystemSettings/ai/toggle`,

     //  AI Exercise Video
  SubmitExerciseVideo: `${BASE_URL}/PhysiotherapyExercise/submit-video`,
}