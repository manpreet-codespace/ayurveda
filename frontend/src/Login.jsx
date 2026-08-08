import axios from 'axios';
import React, { useState } from 'react';
import { API_BASE_URL } from './config/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    if (!loginData.identifier.trim()) {
      setError('Enter your email or phone number');
      return false;
    }
    if (!loginData.password) {
      setError('Enter your password');
      return false;
    }

    return true;
  };

  const savedLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        identifier: loginData.identifier.trim(),
        password: loginData.password,
      });
      console.log(response.data);
      
      localStorage.setItem('authToken', response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-[0_25px_80px_-20px_rgba(16,185,129,0.28)] lg:flex-row">
        <div className="flex flex-1 flex-col justify-between bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 p-8 text-white sm:p-10 lg:p-12">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
              🌿 Welcome Back
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Sign in to continue your wellness journey.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-emerald-50 sm:text-base">
              Access your saved items, track orders, and explore personalized Ayurvedic recommendations.
            </p>
          </div>

          <ul className="mt-8 space-y-3 text-sm sm:text-base">
            {[
              'View your wishlist',
              'Check order updates',
              'Enjoy faster checkout',
              'Get member-only offers',
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
            <h2 className="text-2xl font-semibold text-slate-800">Login to your account</h2>
            <p className="mt-2 text-sm text-slate-500">
              Enter your credentials to get started.
            </p>
          </div>

          <form className="space-y-4" onSubmit={savedLogin}>
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-2 block">Email address or phone number</span>
              <input
                type="text"
                name="identifier"
                value={loginData.identifier}
                onChange={handleChange}
                placeholder="Enter your email or phone number"
                autoComplete="username"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-2 block">Password</span>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </label>

            {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account?{' '}
            <Link to="/user-login" className="font-semibold text-emerald-600 hover:text-emerald-700">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
