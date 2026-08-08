import React from 'react';

const Login = () => {
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

          <form className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-2 block">Email address</span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-2 block">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account?{' '}
            <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;