import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { register } from "../api/user";

const Register = () => {

  const [sebagai, setSebagai] = useState("guru");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({username: "", email: "", password: ""});

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!userData.username || !userData.email || !userData.password) {
      alert("Masukan semua data terlebih dahulu");
      return;
    }

    if(userData.password.length < 8 || userData.password.length > 20) {
      alert("Password minimal 8 karakter maksimal 20 karakter");
      return;
    }

    userData.role = sebagai;

    const response = await register(userData);
    if(response.status === "success"){
      alert('Berhasil Daftar')
      navigate("/login");
    } else {
      alert("Email sudah terdaftar");
    }
    
  }

  return (
    <div class="w-full h-screen flex items-center justify-center bg-violet-50">
      <div class="border rounded-lg py-10 px-5 bg-white">
        <div class="w-[300px]">
          <h2 class="mt-5 text-center text-2xl/9 font-bold tracking-tight text-slate-700">
            Register Quizz
          </h2>
        </div>

        <div class="mt-10 w-[300px]">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                for="email"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Nama Lengkap
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={userData.username} 
                  id="name"
                  autocomplete="name"
                  required
                  class="block w-full rounded-md bg-white/30 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  sm:text-sm/6 outline-none"
                />
              </div>
            </div>

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
                  name="email"
                  onChange={handleChange}
                  value={userData.email} 
                  id="email"
                  required
                  class="block w-full rounded-md bg-white/30 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  sm:text-sm/6 outline-none"
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
                  class="block w-full rounded-md bg-white/30 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  sm:text-sm/6 outline-none"
                />
              </div>
            </div>

            <div className="mt-2">
              <label class="block text-sm/6 font-medium text-gray-900">Daftar sebagai</label>
              <div className="flex items-center gap-3">
                <div onClick={() => setSebagai("guru")} class="flex items-center mb-4">
                    <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                      <div className={`w-3 h-3 rounded-full  ${sebagai === "guru" && "bg-blue-900"}`}></div>
                    </div>
                    <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 cursor-pointer">Guru</label>
                </div>
                <div onClick={() => setSebagai("siswa")} class="flex items-center mb-4">
                    <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                      <div className={`w-3 h-3 rounded-full  ${sebagai === "siswa" && "bg-blue-900"}`}></div>
                    </div>
                    <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 cursor-pointer">Siswa</label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="flex w-full mt-5 justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-5 bg-indigo-600"
            >
              Daftar
            </button>
          </form>
          <Link to={'/login'} className='text-sm'>Sudah Punya Akun ? Masuk</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
