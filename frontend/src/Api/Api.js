export const BASE_URL = "http://diagnosis.runasp.net"


export const API ={
    // Auth
    Login: `${BASE_URL}/Auth/Login`,
    
    // drug checker
    CheckDrugChecker: `${BASE_URL}/DrugChecker/check`,
    GetDrugChecker: (keyword) =>
    `${BASE_URL}/DrugChecker/suggestions?keyword=${keyword}`,
}