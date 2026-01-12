import React from "react";
import { useNavigate } from "react-router-dom";

const stats = [
    { value: "10,000+", label: "Patients" },
    { value: "300+", label: "Verified Doctors" },
    { value: "24/7", label: "Support Available" },
    { value: "30+", label: "Physiotherapy Programs" },
];

const values = [
    {
        title: "Patient-Centered",
        desc: "We put patients first in every decision, ensuring their needs drive our innovation.",
    },
    {
        title: "Excellence",
        desc: "We maintain the highest standards in healthcare delivery and professional conduct.",
    },
    {
        title: "Accessibility",
        desc: "Healthcare should be available when you need it, where you need it, 24/7.",
    },
];

const team = [
    { name: "Dr. Emily Chen", role: "Orthopedic", rating: "4.8" },
    { name: "Dr. Emily Chen", role: "Orthopedic", rating: "4.8" },
    { name: "Dr. Emily Chen", role: "Orthopedic", rating: "4.8" },
];

export default function About() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/register");
    };

    return (
        <section className="w-full bg-white">
            <div className="max-w-6xl px-4 py-10 mx-auto space-y-8 lg:px-6">
                <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-semibold lg:text-3xl text-neutral-900">
                        Who We Are
                    </h2>
                    <p className="max-w-2xl mx-auto text-sm text-neutral-500">
                        A trusted platform connecting patients with quality healthcare.
                        We&apos;re revolutionizing the way people access medical services.
                    </p>
                </div>

                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
                    <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="p-4 bg-white border shadow-sm rounded-2xl border-primary-blue/40">
                                <div className="flex items-center gap-2 font-semibold text-primary-blue">
                                    <span className="inline-flex items-center justify-center rounded-full h-9 w-9 bg-primary-blue/10">
                                        👁
                                    </span>
                                    <span>Our Vision</span>
                                </div>
                                <p className="mt-2 text-xs leading-5 text-neutral-500">
                                    To redefine digital healthcare by creating an intelligent, connected
                                    platform where patients receive accurate assessments, continuous
                                    support, and seamless access to professional medical care.
                                </p>
                            </div>
                            <div className="p-4 bg-white border shadow-sm rounded-2xl border-primary-blue/40">
                                <div className="flex items-center gap-2 font-semibold text-primary-blue">
                                    <span className="inline-flex items-center justify-center rounded-full h-9 w-9 bg-primary-blue/10">
                                        🎯
                                    </span>
                                    <span>Our Mission</span>
                                </div>
                                <p className="mt-2 text-xs leading-5 text-neutral-500">
                                    To empower patients with smart, accessible, and personalized healthcare
                                    tools — combining AI‑powered motion analysis, digital medical services,
                                    and expert guidance to improve health outcomes anytime, anywhere.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-white border shadow-sm rounded-2xl border-primary-blue/20">
                            <p className="text-sm leading-6 text-neutral-600">Our Story</p>
                            <p className="mt-2 text-xs leading-6 text-neutral-500">
                                Founded in 2023, our platform began with a clear mission: making
                                healthcare and physiotherapy support more accessible, accurate, and
                                affordable for every patient. Our team — a blend of medical specialists
                                and AI engineers — saw how difficult it was for patients to get proper
                                assessments, follow‑ups, and guidance outside the clinic.
                            </p>
                            <p className="mt-2 text-xs leading-6 text-neutral-500">
                                What started as a small digital tool has grown into an integrated
                                healthcare ecosystem that serves thousands of patients nationwide. Today,
                                our AI‑powered motion analysis, digital medical services, and seamless
                                communication tools help bridge the gap between patients and healthcare
                                professionals.
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden border shadow-sm rounded-2xl border-primary-blue/20 bg-neutral-100">
                        <img
                            src="https://images.pexels.com/photos/5726791/pexels-photo-5726791.jpeg?auto=compress&cs=tinysrgb&w=1200"
                            alt="Doctors"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                <div className="px-6 py-4 text-white shadow-sm rounded-2xl bg-primary-blue">
                    <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="space-y-1">
                                <p className="text-lg font-semibold">{stat.value}</p>
                                <p className="text-xs text-white/80">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-3 text-center">
                    <h3 className="text-xl font-semibold text-neutral-900">Our Values</h3>
                    <p className="text-sm text-neutral-500">
                        These core principles guide everything we do.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {values.map((value) => (
                        <div
                            key={value.title}
                            className="p-4 text-center bg-white border shadow-sm rounded-2xl border-primary-blue/20"
                        >
                            <div className="text-sm font-semibold text-primary-blue">
                                {value.title}
                            </div>
                            <p className="mt-2 text-xs text-neutral-500">{value.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 text-center">
                    <h3 className="text-xl font-semibold text-neutral-900">
                        Meet Our Leadership Team
                    </h3>
                    <p className="text-sm text-neutral-500">
                        Dedicated professionals committed to transforming healthcare.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {team.map((member, idx) => (
                        <div
                            key={`${member.name}-${idx}`}
                            className="p-4 bg-white border shadow-sm rounded-2xl border-primary-blue/20"
                        >
                            <div className="h-32 overflow-hidden rounded-xl bg-neutral-100">
                                <img
                                    src="https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=600"
                                    alt={member.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="mt-3 space-y-1">
                                <p className="text-sm font-semibold text-neutral-800">
                                    {member.name}
                                </p>
                                <p className="text-xs text-neutral-500">{member.role}</p>
                                <p className="text-xs text-amber-500">★ {member.rating}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="px-6 py-6 space-y-3 text-center text-white shadow-sm rounded-2xl bg-primary-blue">
                    <p className="text-sm font-semibold">Join Our Community</p>
                    <p className="text-xs text-white/80">
                        Be part of a healthcare revolution. Sign up today and experience the
                        future of medical care.
                    </p>
                    <button
                        onClick={handleSignUp}
                        className="px-5 py-2 text-sm font-semibold bg-white rounded-xl text-primary-blue hover:bg-gray-100 transition-colors"
                    >
                        Sign up now!
                    </button>
                </div>
            </div>
        </section>
    );
}
