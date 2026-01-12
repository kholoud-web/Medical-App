import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthState } from "../../RiduxToolkit/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import bgImage from "./Image/LoginImg.jpg";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [errors, setErrors] = useState({});
  const [serverEmailError, setServerEmailError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) setErrors({ ...errors, [name]: "" });

    if (serverEmailError && name === "email") setServerEmailError("");
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    const newErrors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.secondName.trim()) newErrors.secondName = "Second name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.birthDate) newErrors.birthDate = "Birth date is required";

    if (!formData.password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(formData.password))
      newErrors.password =
        "Password must contain uppercase, lowercase, digit, special character and be at least 8 characters long";

    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.gender) newErrors.gender = "Please select gender";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // console.log("Sending data to API:", {
    //   userName: `${formData.firstName}${formData.secondName}`,
    //   email: formData.email,
    //   password: formData.password,
    //   confirmPassword: formData.confirmPassword,
    //   phoneNumber: "+201234567890",
    //   gender: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1),
    //   fName: formData.firstName,
    //   lName: formData.secondName,
    //   birthDate: formData.birthDate,
    //   clientUri: "https://frontend-app.com/confirm-email",
    // });

   dispatch(
  registerUser({
    userName: `${formData.firstName}${formData.secondName}_${Date.now().toString().slice(-4)}`,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    phoneNumber: "+201234567890",
    gender: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1),
    fName: formData.firstName,
    lName: formData.secondName,
    birthDate: formData.birthDate,
    clientUri: "https://frontend-app.com/confirm-email",
  })
);

  };

useEffect(() => {
  if (success) {
    dispatch(clearAuthState());
    navigate("/login");
  }
}, [success, navigate, dispatch]);

const emailAlreadyExists = React.useMemo(() => {
  if (typeof error === "string") {
    return error.toLowerCase().includes("email")
      ? "هذا البريد الإلكتروني مسجل بالفعل"
      : "";
  }
  return "";
}, [error]);


  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center px-4 sm:px-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-xl rounded-2xl bg-black/40 backdrop-blur-md p-6 sm:p-8 shadow-2xl flex justify-center overflow-hidden">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-white text-center mb-4 sm:mb-6">Registration</h1>


{/* /////////////////////////////Form////////////////////////////// */}
          <form onSubmit={handleConfirm} className="w-full flex flex-col items-center space-y-2">
            {/* First Name */}
            <div className="w-full">
              <label className="block text-white text-[12px] sm:text-[14px] mb-1">First name</label>
              <input
                name="firstName"
                onChange={handleChange}
                className={`w-full h-[33px] sm:h-[38px] rounded-lg bg-white px-3 sm:px-4 text-gray-800 text-[12px] sm:text-[14px] outline-none focus:ring-2 focus:ring-blue-500
                  ${errors.firstName ? "border border-red-500" : ""}`}
              />
              <p className="text-red-500 text-[11px] sm:text-[12px] mt-1 min-h-[14px]">{errors.firstName || ""}</p>
            </div>

            {/* Second Name */}
            <div className="w-full">
              <label className="block text-white text-[12px] sm:text-[14px] mb-1">Second name</label>
              <input
                name="secondName"
                onChange={handleChange}
                className={`w-full h-[33px] sm:h-[38px] rounded-lg bg-white px-3 sm:px-4 text-gray-800 text-[12px] sm:text-[14px] outline-none focus:ring-2 focus:ring-blue-500
                  ${errors.secondName ? "border border-red-500" : ""}`}
              />
              <p className="text-red-500 text-[11px] sm:text-[12px] mt-1 min-h-[14px]">{errors.secondName || ""}</p>
            </div>

            {/* Email */}
           <div className="w-full">
  <label className="block text-white text-[12px] sm:text-[14px] mb-1">Email</label>
  <input
    name="email"
    onChange={handleChange}
    type="email"
    className={`w-full h-[33px] sm:h-[38px] rounded-lg bg-white px-3 sm:px-4 text-gray-800
      ${errors.email || serverEmailError ? "border border-red-500" : ""}`}
  />
 <p className="text-red-500 text-[11px] mt-1 min-h-[14px]">
  {errors.email || emailAlreadyExists || ""}
</p>

</div>


            {/* Birth Date */}
            <div className="w-full">
              <label className="block text-white text-[12px] sm:text-[14px] mb-1">Birth date</label>
              <input
                name="birthDate"
                onChange={handleChange}
                type="date"
                className={`w-full h-[33px] sm:h-[38px] rounded-lg bg-white px-3 sm:px-4 text-gray-800 text-[12px] sm:text-[14px] outline-none focus:ring-2 focus:ring-blue-500
                  ${errors.birthDate ? "border border-red-500" : ""}`}
              />
              <p className="text-red-500 text-[11px] sm:text-[12px] mt-1 min-h-[14px]">{errors.birthDate || ""}</p>
            </div>

            {/* Password */}
            <div className="w-full">
              <label className="block text-white text-[12px] sm:text-[14px] mb-1">Password</label>
              <input
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="create password at least 8ch .."
                className={`w-full h-[33px] sm:h-[38px] rounded-lg bg-white px-3 sm:px-4 text-gray-800 text-[12px] sm:text-[14px] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500
                  ${errors.password ? "border border-red-500" : ""}`}
              />
              <p className="text-red-500 text-[11px] sm:text-[12px] mt-1 min-h-[14px]">{errors.password || ""}</p>
            </div>

            {/* Confirm Password */}
            <div className="w-full">
              <label className="block text-white text-[12px] sm:text-[14px] mb-1">Confirm Password</label>
              <input
                name="confirmPassword"
                onChange={handleChange}
                type="password"
                className={`w-full h-[33px] sm:h-[38px] rounded-lg bg-white px-3 sm:px-4 text-gray-800 text-[12px] sm:text-[14px] outline-none focus:ring-2 focus:ring-blue-500
                  ${errors.confirmPassword ? "border border-red-500" : ""}`}
              />
              <p className="text-red-500 text-[11px] sm:text-[12px] mt-1 min-h-[14px]">{errors.confirmPassword || ""}</p>
            </div>

            {/* Gender */}
            <div className="w-full pt-2">
              <label className="block text-white text-[12px] sm:text-[14px] mb-1">Gender</label>
              <div className="flex gap-8 sm:gap-10 items-center">
                <label className="flex items-center gap-2 text-white">
                  <input type="radio" name="gender" value="male" onChange={handleChange} className="accent-blue-500" />
                  Male
                </label>
                <label className="flex items-center gap-2 text-white">
                  <input type="radio" name="gender" value="female" onChange={handleChange} className="accent-blue-500" />
                  Female
                </label>
              </div>
              <p className="text-red-500 text-[11px] sm:text-[12px] mt-1 min-h-[14px]">{errors.gender || ""}</p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-[333px] h-[33px] sm:h-[38px] mt-4 sm:mt-6 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
            >
              {loading ? "جاري التسجيل..." : "Confirm"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
