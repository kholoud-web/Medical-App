import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from './Image/LoginImg.jpg'


export default function Login() {
  const [role, setRole] = useState("patient");

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

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="text"
                placeholder="Enter your email or phone number..."
                className="mt-1 w-full rounded-md border border-white/20 bg-white px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/40 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Password</label>
              <input
                type="password"
                placeholder="Enter your password..."
                className="mt-1 w-full rounded-md border border-white/20 bg-white px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/40 outline-none"
              />
              <div className="mt-2 text-xs text-neutral-200">
                <Link to="/forgot-password" className="hover:underline">
                  Forgot your password..?
                </Link>
              </div>
            </div>

            <button className="w-full mt-4 rounded-md bg-primary-blue py-2 text-sm font-semibold shadow hover:bg-primary-blue/90">
              Log in
            </button>
          </div>

          <p className="mt-4 text-xs text-center text-neutral-200">
            Don&apos;t Have Account
          </p>
        </div>
      </div>
    </div>
  );
}
