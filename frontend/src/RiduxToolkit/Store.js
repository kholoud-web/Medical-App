import { configureStore } from "@reduxjs/toolkit";
import drugCheckerReducer from "./Slices/DrugCheckerSlice";
<<<<<<< HEAD
import inquiryReducer from './Slices/InquirySlice'
=======
import authReducer from './Slices/authSlice'
import consultationReducer from './Slices/ConsultationSlice';
import inquiryReducer from './Slices/inquirySlice.js'
import modifyConsultationReducer from "./Slices/modifyConsultationSlice";
>>>>>>> 316e6907ea85a8ec2aaaae6a093e77a063d20889


export const store = configureStore({
  reducer: {
    drugChecker: drugCheckerReducer,
<<<<<<< HEAD
    inquiry : inquiryReducer,

  },
 

});
=======
    auth: authReducer,
    consultation: consultationReducer,
    modifyConsultation: modifyConsultationReducer,
    inquiry:inquiryReducer,
  },
}); 
>>>>>>> 316e6907ea85a8ec2aaaae6a093e77a063d20889
