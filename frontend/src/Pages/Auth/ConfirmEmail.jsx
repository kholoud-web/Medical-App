import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmEmail, clearAuthState } from "@/RiduxToolkit/Slices/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import bgImage from "./Image/LoginImg.jpg";

export default function ConfirmEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("token") || "";
  const emailFromUrl = searchParams.get("email") || "";

  const [token, setToken] = useState(tokenFromUrl);
  const [email, setEmail] = useState(emailFromUrl);
  const [message, setMessage] = useState("");

 
  const handleConfirm = async () => {
    if (!token || !email) {
      setMessage("من فضلك أدخل البريد الإلكتروني ورمز التفعيل.");
      return;
    }

    try {
      const res = await dispatch(confirmEmail({ token, email })).unwrap();
      
      if (res.success) {
        setMessage("تم تأكيد البريد الإلكتروني بنجاح، سيتم تحويلك لتسجيل الدخول...");
        setTimeout(() => {
          dispatch(clearAuthState());
          navigate("/login");
        }, 3000);
      } else {
     
        if (res.errorMessage.includes("Invalid token")) {
          setMessage("الرمز غير صالح. الرجاء طلب رابط تفعيل جديد.");
        } else if (res.errorMessage.includes("Optimistic concurrency failure")) {
          setMessage("هذا الرابط قد تم استخدامه من قبل أو انتهت صلاحيته. الرجاء طلب رابط جديد.");
        } else {
          setMessage(res.errorMessage || "حدث خطأ أثناء تأكيد البريد.");
        }
      }

    } catch (err) {
      console.log("Confirm email error:", err);
      setMessage("فشل تأكيد البريد الإلكتروني. الرجاء المحاولة لاحقًا.");
    }
  };

  
  useEffect(() => {
    if (success) {
      setMessage(
        "تم تأكيد البريد الإلكتروني بنجاح، سيتم تحويلك لتسجيل الدخول..."
      );
      setTimeout(() => {
        dispatch(clearAuthState());
        navigate("/login");
      }, 3000);
    }
  }, [success, dispatch, navigate]);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md bg-black/40 p-6 rounded-2xl backdrop-blur-md text-white">
        <h1 className="text-2xl font-bold text-center mb-4">Confirm Email</h1>

        {message && (
          <p className="text-center text-sm mb-4 text-yellow-300">{message}</p>
        )}

        {!success && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 p-2 rounded bg-white text-black"
            />

            <textarea
              placeholder="Paste token here"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full h-24 mb-4 p-2 rounded bg-white text-black"
            />

            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full bg-blue-600 py-2 rounded font-semibold hover:bg-blue-700"
            >
              {loading ? "Confirming..." : "Confirm Email"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
