export const BASE_URL = "http://diagnosis.runasp.net"


export const API ={
    // drug checker
    CheckDrugChecker: `${BASE_URL}/DrugChecker/check`,
    GetDrugChecker: (keyword) =>
    `${BASE_URL}/DrugChecker/suggestions?keyword=${keyword}`,

    

}