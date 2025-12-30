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
  
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [canSendLink, setCanSendLink] = useState(true);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);

  const { loading, success, error: authError, resetToken, resetEmail } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    const emailFromUrl = searchParams.get("email");
    
    if (tokenFromUrl && emailFromUrl) {
      dispatch(setResetToken({ email: emailFromUrl, token: tokenFromUrl }));
      setEmail(emailFromUrl);
      setStep(2);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      dispatch(clearAuthState());
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (success && step === 2 && passwordSubmitted) {
      navigate("/reset-success");
    }
  }, [success, navigate, step, passwordSubmitted]);

  useEffect(() => {
    if (success && step === 1) {
      const emailToUse = resetEmail || email;
      
      if (emailToUse) {
        setError("");
        setCanSendLink(false);
        setCooldownSeconds(60);
        dispatch(clearAuthState());
      } else {
        setError("Email verification failed. Please try again.");
      }
    }
  }, [success, resetEmail, step, email, dispatch]);
  
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
      setError("");
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

    if (!canSendLink) {
      setError(`Please wait ${cooldownSeconds} seconds before requesting another reset link.`);
      return;
    }

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

    setPasswordSubmitted(true);

    if (!resetToken || resetToken === "server-stored" || resetToken === null || resetToken === "") {
      setError("Token is required. Please use the reset link sent to your email, or request a new reset link.");
      setPasswordSubmitted(false);
      return;
    }
    
    const tokenToSend = resetToken;
    
    dispatch(
      resetPassword({
        email: emailToUse,
        token: tokenToSend,
        password,
        passwordConfirmation,
      })
    );
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen bg-slate-900/60 flex items-center justify-center p-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 text-white hover:text-blue-400 transition"
        >
          <IoIosArrowBack size={26} />
        </button>

        <div className="w-full max-w-lg rounded-2xl bg-black/50 text-white border border-white/10 shadow-2xl p-8 backdrop-blur-sm">
          <h1 className="text-3xl font-semibold text-center mb-6">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h1>
          
          {step === 1 && (
            <>
              <p className="text-white/70 text-sm text-center mb-4">
                Enter your email address and we'll send you a reset link
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-md bg-red-500/20 border border-red-500/50 px-3 py-2 text-sm text-red-200">
                    {error}
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className={`mt-1 w-full rounded-md border border-white/20 bg-white px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/40 outline-none ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="text-red-300 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !canSendLink}
                  className="w-full mt-4 rounded-md bg-primary-blue py-2 text-sm font-semibold shadow hover:bg-primary-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : !canSendLink ? `Wait ${cooldownSeconds}s` : "Send Reset Link"}
                </button>
                
                {success && step === 1 && (
                  <div className="mt-4 rounded-md bg-green-500/20 border border-green-500/50 px-3 py-2 text-sm text-green-200">
                    Reset link has been sent to your email. Please check your inbox and click the link to continue.
                  </div>
                )}
              </form>
            </>
          )}

          {step === 2 && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-500/20 border border-red-500/50 px-3 py-2 text-sm text-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  value={resetEmail || email}
                  disabled
                  className="mt-1 w-full rounded-md border border-white/20 bg-white/50 px-3 py-2 text-sm text-neutral-600"
                />
                <p className="text-white/70 text-xs mt-1">
                  Enter your new password below
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold">New password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password..."
                  className={`mt-1 w-full rounded-md border border-white/20 bg-white px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/40 outline-none ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  disabled={loading}
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

              <div>
                <label className="text-sm font-semibold">Confirm password</label>
                <input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Confirm new password..."
                  className={`mt-1 w-full rounded-md border border-white/20 bg-white px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/40 outline-none ${
                    errors.passwordConfirmation ? "border-red-500" : ""
                  }`}
                  disabled={loading}
                />
                {errors.passwordConfirmation && (
                  <p className="text-red-300 text-xs mt-1">{errors.passwordConfirmation}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 rounded-md bg-primary-blue py-2 text-sm font-semibold shadow hover:bg-primary-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
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
