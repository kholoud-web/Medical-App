import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetPassword, clearAuthState, setResetToken } from "@/RiduxToolkit/Slices/authSlice";
import bgImage from "./Image/LoginImg.jpg";
import { IoIosArrowBack } from "react-icons/io";

export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  
  // Step 1: Email input
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1 = email step, 2 = password step
  
  // Check if token and email are in URL (from email link)
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    const emailFromUrl = searchParams.get("email");
    
    if (tokenFromUrl && emailFromUrl) {
      // User came from email link - extract token and email from URL
      console.log("Token and email found in URL:", { token: tokenFromUrl, email: emailFromUrl });
      dispatch(setResetToken({ email: emailFromUrl, token: tokenFromUrl }));
      setEmail(emailFromUrl);
      setStep(2); // Go directly to step 2
    }
  }, [searchParams, dispatch]);
  
  // Step 2: Password input
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  
  // Cooldown timer for reset link
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [canSendLink, setCanSendLink] = useState(true);

  const { loading, success, error: authError, resetToken, resetEmail } = useSelector((state) => state.auth);
  
  // Debug: Log state changes
  useEffect(() => {
    console.log("ResetPassword state:", { step, loading, success, resetEmail, resetToken, error: authError });
  }, [step, loading, success, resetEmail, resetToken, authError]);

  useEffect(() => {
    // Check if token and email are in URL (from email link)
    const tokenFromUrl = new URLSearchParams(window.location.search).get("token");
    const emailFromUrl = new URLSearchParams(window.location.search).get("email");
    
    if (tokenFromUrl && emailFromUrl) {
      // User came from email link - extract token and email from URL
      console.log("Token and email found in URL from email link:", { token: tokenFromUrl, email: emailFromUrl });
      dispatch(setResetToken({ email: emailFromUrl, token: tokenFromUrl }));
      setEmail(emailFromUrl);
      setStep(2); // Go directly to step 2 (skip step 1)
      // Clear URL parameters for security
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // No token in URL - user needs to start from step 1
      dispatch(clearAuthState());
    }
  }, [dispatch]);

  // Handle success for password reset (step 2) - only redirect after password is actually submitted
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);
  
  useEffect(() => {
    if (success && step === 2 && passwordSubmitted) {
      // Only redirect if password was actually submitted
      navigate("/reset-success");
    }
  }, [success, navigate, step, passwordSubmitted]);

  // Handle success for forgot password
  useEffect(() => {
    if (success && step === 1) {
      // Forget password succeeded - email was sent with reset link
      // User needs to check their email and click the link to get the token
      // Don't move to step 2 yet - wait for token from email link
      const emailToUse = resetEmail || email;
      console.log("Forgot password success. Email sent with reset link. ResetEmail:", resetEmail, "Email:", email);
      
      if (emailToUse) {
        // Show success message - user needs to check email
        setError(""); // Clear any errors
        // Start cooldown timer (60 seconds)
        setCanSendLink(false);
        setCooldownSeconds(60);
        // Don't move to step 2 - user must click email link to get token
        dispatch(clearAuthState());
      } else {
        console.error("No email found after forgot password success");
        setError("Email verification failed. Please try again.");
      }
    }
  }, [success, resetEmail, step, email, dispatch]);
  
  // Cooldown timer countdown
  useEffect(() => {
    let interval = null;
    if (cooldownSeconds > 0) {
      interval = setInterval(() => {
        setCooldownSeconds((prev) => {
          if (prev <= 1) {
            setCanSendLink(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setCanSendLink(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cooldownSeconds]);

  useEffect(() => {
    if (authError) {
      console.log("Auth error in ResetPassword:", authError);
      if (authError.message) {
        setError(authError.message);
      } else if (typeof authError === "string") {
        setError(authError);
      } else {
        setError(step === 1 
          ? "Email not found or invalid. Please try again." 
          : "Failed to reset password. Please try again.");
      }
    } else {
      setError(""); // Clear error when authError is cleared
    }
  }, [authError, step]);

  const validateEmail = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Real-time password strength checking
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, message: "", checks: {} };
    
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const strength = (passedChecks / 5) * 100;
    
    let message = "";
    let color = "text-red-300";
    if (strength === 100) {
      message = "Strong password";
      color = "text-green-300";
    } else if (strength >= 60) {
      message = "Medium strength";
      color = "text-yellow-300";
    } else if (strength >= 20) {
      message = "Weak password";
      color = "text-orange-300";
    } else {
      message = "Very weak";
      color = "text-red-300";
    }
    
    return { strength, message, checks, color };
  };

  const validatePassword = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else {
      // Check password requirements: uppercase, lowercase, digit, special character
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasDigit = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (!hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar) {
        newErrors.password =
          "Password must contain uppercase, lowercase, digit, and special character";
      }
    }

    if (!passwordConfirmation) {
      newErrors.passwordConfirmation = "Please confirm your password";
    } else if (password !== passwordConfirmation) {
      newErrors.passwordConfirmation = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrors({});

    if (!validateEmail()) {
      return;
    }

    // Check cooldown
    if (!canSendLink) {
      setError(`Please wait ${cooldownSeconds} seconds before requesting another reset link.`);
      return;
    }
    if (!canSendLink) {
      setError(`Please wait ${cooldownSeconds} seconds before requesting another reset link.`);
      return;
    }

    console.log("Validating email for password reset:", email);
    
    // Call forgot password to validate email and get token internally
    // This will try to validate the email through the reset-password endpoint
    dispatch(forgotPassword(email));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrors({});

    if (!validatePassword()) {
      return;
    }

    const emailToUse = resetEmail || email;
    
    if (!emailToUse) {
      setError("Email is missing. Please start over.");
      return;
    }

    console.log("Submitting password reset. Email:", emailToUse, "Token:", resetToken);
    
    // Mark that password is being submitted
    setPasswordSubmitted(true);

    // Token must come from the email link (URL parameter)
    // If we don't have a valid token, show error
    if (!resetToken || resetToken === "server-stored" || resetToken === null || resetToken === "") {
      setError("Token is required. Please use the reset link sent to your email, or request a new reset link.");
      setPasswordSubmitted(false);
      return;
    }
    
    const tokenToSend = resetToken;
    
    dispatch(
      resetPassword({
        email: emailToUse,
        token: tokenToSend, // Will be empty if forgot password endpoint doesn't exist
        password,
        passwordConfirmation,
      })
    );
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 text-white hover:text-blue-400 transition"
      >
        <IoIosArrowBack size={26} />
      </button>

      <div className="relative z-10 w-[55%] max-w-5xl rounded-[32px] bg-black/40 backdrop-blur-md p-12 shadow-2xl flex justify-center">
        
        <div className="w-full flex flex-col items-center">
          
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h2>
          
          {step === 1 && (
            <p className="text-white/70 text-sm text-center mb-4 max-w-md">
              Enter your email address and we'll send you a reset link
            </p>
          )}
          
          {step === 2 && !resetToken && (
            <p className="text-yellow-300 text-sm text-center mb-4 max-w-md">
              Please use the reset link sent to your email to get the token, or request a new reset link.
            </p>
          )}

          {/* Step 1: Email Input */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6 flex flex-col items-center w-full">
              {error && (
                <div className="w-[430px] rounded-md bg-red-500/20 border border-red-500/50 px-3 py-2 text-sm text-red-200">
                  {error}
                </div>
              )}

              <div className="w-[430px]">
                <label className="block text-white text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full h-[40px] rounded-lg bg-white px-4 outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-2 border-red-500" : ""
                  }`}
                  disabled={loading}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-300 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !canSendLink}
                className="w-[333px] h-[38px] mt-6 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : !canSendLink ? `Wait ${cooldownSeconds}s` : "Send Reset Link"}
              </button>
              
              {success && step === 1 && (
                <div className="w-[430px] mt-4 rounded-md bg-green-500/20 border border-green-500/50 px-3 py-2 text-sm text-green-200">
                  Reset link has been sent to your email. Please check your inbox and click the link to continue.
                </div>
              )}
            </form>
          )}

          {/* Step 2: Password Input */}
          {step === 2 && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6 flex flex-col items-center w-full">
              {error && (
                <div className="w-[430px] rounded-md bg-red-500/20 border border-red-500/50 px-3 py-2 text-sm text-red-200">
                  {error}
                </div>
              )}

              <div className="w-[430px]">
                <label className="block text-white text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={resetEmail || email}
                  disabled
                  className="w-full h-[40px] rounded-lg bg-gray-200 px-4 outline-none text-gray-600"
                />
                <p className="text-white/70 text-xs mt-1">
                  Enter your new password below
                </p>
              </div>

              <div className="w-[430px]">
                <label className="block text-white text-sm mb-1">New password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full h-[40px] rounded-lg bg-white px-4 outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-2 border-red-500" : ""
                  }`}
                  disabled={loading}
                  placeholder="Enter new password"
                />
                {password && (
                  <div className="mt-2 space-y-1">
                    {(() => {
                      const strength = getPasswordStrength();
                      return (
                        <>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  strength.strength === 100
                                    ? "bg-green-500"
                                    : strength.strength >= 60
                                    ? "bg-yellow-500"
                                    : strength.strength >= 20
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${strength.strength}%` }}
                              />
                            </div>
                            <span className={`text-xs ${strength.color} font-medium`}>
                              {strength.message}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-xs">
                            <div className={`flex items-center gap-1 ${strength.checks.length ? "text-green-300" : "text-gray-400"}`}>
                              <span>{strength.checks.length ? "✓" : "○"}</span>
                              <span>8+ characters</span>
                            </div>
                            <div className={`flex items-center gap-1 ${strength.checks.uppercase ? "text-green-300" : "text-gray-400"}`}>
                              <span>{strength.checks.uppercase ? "✓" : "○"}</span>
                              <span>Uppercase</span>
                            </div>
                            <div className={`flex items-center gap-1 ${strength.checks.lowercase ? "text-green-300" : "text-gray-400"}`}>
                              <span>{strength.checks.lowercase ? "✓" : "○"}</span>
                              <span>Lowercase</span>
                            </div>
                            <div className={`flex items-center gap-1 ${strength.checks.digit ? "text-green-300" : "text-gray-400"}`}>
                              <span>{strength.checks.digit ? "✓" : "○"}</span>
                              <span>Number</span>
                            </div>
                            <div className={`flex items-center gap-1 ${strength.checks.special ? "text-green-300" : "text-gray-400"}`}>
                              <span>{strength.checks.special ? "✓" : "○"}</span>
                              <span>Special char</span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}
                {errors.password && (
                  <p className="text-red-300 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="w-[430px]">
                <label className="block text-white text-sm mb-1">Confirm password</label>
                <input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className={`w-full h-[40px] rounded-lg bg-white px-4 outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.passwordConfirmation ? "border-2 border-red-500" : ""
                  }`}
                  disabled={loading}
                  placeholder="Confirm new password"
                />
                {errors.passwordConfirmation && (
                  <p className="text-red-300 text-xs mt-1">{errors.passwordConfirmation}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-[333px] h-[38px] mt-6 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Resetting Password..." : "Confirm"}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
