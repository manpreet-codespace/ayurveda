import axios from 'axios';
import React, { useState } from 'react';
import { API_BASE_URL } from './config/api';


const Signup = () => {
    const initialFormData = {
        name: "",
        email: "",
        phonenumber: "",
        password: ""
    };

    const [formData, setFormData] = useState(initialFormData);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!formData.name.trim() || formData.name.trim().length < 2) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Email is not valid";
        }

        if (!formData.phonenumber.trim()) {
            newErrors.phonenumber = "Phone Number is required";
        } else if (!phoneRegex.test(formData.phonenumber.trim())) {
            newErrors.phonenumber = "Phone number is not valid";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "confirmPassword") {
            setConfirmPassword(value);
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            e.preventDefault();
            
            const response = await axios.post(`${API_BASE_URL}/auth/user-login`, formData);

            console.log(response.data);
            setFormData(initialFormData);
            setConfirmPassword("");
            setErrors({});
        } catch (err) {
            console.log(err.message);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-[0_25px_80px_-20px_rgba(16,185,129,0.28)] lg:flex-row">
                <div className="flex flex-1 flex-col justify-between bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 p-8 text-white sm:p-10 lg:p-12">
                    <div>
                        <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
                            🌿 Ayurvedic Wellness Club
                        </div>
                        <h1 className="text-3xl font-bold sm:text-4xl">
                            Create your account and enjoy a smarter shopping experience.
                        </h1>
                        <p className="mt-4 max-w-md text-sm leading-6 text-emerald-50 sm:text-base">
                            Sign up to save your favorites, track orders, and unlock member-only offers tailored for your wellness journey.
                        </p>
                    </div>

                    <ul className="mt-8 space-y-3 text-sm sm:text-base">
                        {[
                            'Secure and fast checkout',
                            'Save your wishlist for later',
                            'Track every order in one place',
                            'Get exclusive wellness offers',
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-3">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-sm">
                                    ✓
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-1 bg-white p-8 sm:p-10 lg:p-12">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-slate-800">Welcome aboard</h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Fill in your details to get started.
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSignup}>
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-sm font-medium text-slate-700">
                                <span className="mb-2 block">Full name</span>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                                    onChange={handleChange}
                                    value={formData.name}
                                    name='name'
                                />
                                {errors.name && <p className='text-red-500 font-semilbold'>{errors.name}</p>}
                            </label>
                            

                            <label className="block text-sm font-medium text-slate-700">
                                <span className="mb-2 block">Phone number</span>
                                <input
                                    type="tel"
                                    placeholder="Enter your phone"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                                    onChange={handleChange}
                                    value = {formData.phonenumber}
                                    name='phonenumber'
                                />
                                {errors.phonenumber && <p className='text-red-500 font-semilbold'>{errors.phonenumber}</p>}

                            </label>
                        </div>

                        <label className="block text-sm font-medium text-slate-700">
                            <span className="mb-2 block">Email address</span>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                                onChange={handleChange}
                                value={formData.email}
                                name='email'
                            />
                                {errors.email && <p className='text-red-500 font-semilbold'>{errors.email}</p>}

                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                            <span className="mb-2 block">Password</span>
                            <input
                                type="password"
                                placeholder="Create a password"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                                onChange={handleChange}
                                value={formData.password}
                                name='password'
                            />
                                {errors.password && <p className='text-red-500 font-semilbold'>{errors.password}</p>}

                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                            <span className="mb-2 block">Confirm password</span>
                            <input
                                type="password"
                                placeholder="Re-enter your password"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                                onChange={handleChange}
                                name='confirmPassword'
                                value={confirmPassword}
                            />
                            {errors.confirmPassword && <p className='text-red-500 font-semilbold'>{errors.confirmPassword}</p>}
                        </label>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Create account
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Already have an account?{' '}
                        <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;