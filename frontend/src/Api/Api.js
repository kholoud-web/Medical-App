export const BASE_URL = "http://diagnosis.runasp.net"


export const API ={
    // drug checker
    CheckDrugChecker: `${BASE_URL}/DrugChecker/check`,
    GetDrugChecker: (keyword) =>
        `${BASE_URL}/DrugChecker/suggestions?keyword=${keyword}`,
    //Patient Dashboard
    GetRecentInquiries: `${BASE_URL}/Inquiry/recent`,
    GetPendingInquiriesCount: `${BASE_URL}/Inquiry/pending`,
    GetSymptomCountThisWeek: `${BASE_URL}/Consultation/symptom-count-this-week`,
    GetTopSymptomsThisWeek: `${BASE_URL}/Consultation/top-symptoms-this-week`,
}
