import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthState } from "@/RiduxToolkit/Slices/authSlice";
import bgImage from './Image/LoginImg.jpg'


export default function Login() {
  const [role, setRole] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, role: userRole, error: authError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearAuthState());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (authError) {
      if (authError.message) {
        setError(authError.message);
      } else if (typeof authError === "string") {
        setError(authError);
      } else {
        setError("Invalid email or password");
      }
    }
  }, [authError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen bg-slate-900/60 flex items-center justify-center p-6">
        <div className="absolute left-6 top-6">
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="rounded-lg bg-white/15 text-white border border-white/30 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Select role"
          >
            <option className="text-neutral-900" value="patient">
              Patient
            </option>
            <option className="text-neutral-900" value="doctor">
              Doctor
            </option>
            <option className="text-neutral-900" value="admin">
              Admin
            </option>
          </select>
        </div>

        <div className="w-full max-w-lg rounded-2xl bg-black/50 text-white border border-white/10 shadow-2xl p-8 backdrop-blur-sm">
          <h1 className="text-3xl font-semibold text-center mb-6">Log in</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="mt-1 w-full rounded-md border border-white/20 bg-white px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/40 outline-none"
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password..."
                className="mt-1 w-full rounded-md border border-white/20 bg-white px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/40 outline-none"
                disabled={loading}
              />
              <div className="mt-2 text-xs text-neutral-200">
                <Link to="/reset-password" className="hover:underline">
                  Forgot your password..?
                </Link>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-4 rounded-md bg-primary-blue py-2 text-sm font-semibold shadow hover:bg-primary-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <Link to="/register">
            <p className="mt-4 text-xs text-center text-neutral-200 hover:text-blue-400 cursor-pointer transition">
              Don&apos;t Have Account? Sign up
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
