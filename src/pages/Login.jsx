import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Cookies from 'js-cookie'
import {login} from '../api/user';

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      alert("Form harus diisi semua");
      return;
    }

    try {
      const response = await login(userData);
      if (response.status === "success") {
        const { id } = response.user;
        Cookies.set('authToken', id, { expires: 7, secure: true, sameSite: 'Strict' });
        navigate("/");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error  login:", error);
    }
  };
  return (
    <body class="w-full h-screen flex items-center justify-center bg-violet-50">
      <div class="border rounded-lg py-10 px-5 bg-white">
        <div class="w-[300px]">
          <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-slate-700">
            Login Quizz
          </h2>
        </div>

        <div class="mt-10 w-[300px]">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                for="email"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Email
              </label>
              <div class="mt-2">
                <input
                  type="email"
                  name='email'
                  onChange={handleChange}
                  value={userData.email}
                  required
                  class="block w-full rounded-md bg-white/30 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 sm:text-sm/6 outline-none"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div class="mt-2">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={userData.password}
                  id="password"
                  autocomplete="current-password"
                  required
                  class="block w-full rounded-md bg-white/30 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 sm:text-sm/6 outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              class="flex mt-8 w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-5 bg-indigo-600"
            >
              Login
            </button>
          </form>
          <Link to={"/register"} className="text-sm">
            Belum Punya Akun ? Daftar
          </Link>
        </div>
      </div>
    </body>
  );
};

export default Login;
