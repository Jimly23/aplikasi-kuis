import React, { useEffect, useState } from "react";
import Navbar from "../components/templates/Navbar";
import Button from "../components/atoms/Button";
import { Link, useNavigate } from "react-router-dom";
import { joinKuis } from "../api/kuis";
import Cookies from 'js-cookie'
import { getUserById } from "../api/user";
import landing from '../assets/logo.jpg'

const PopupJoinKuis = ({setIsJoin}) => {
  const navigate = useNavigate();
  const [kodeJoin, setKodeJoin] = useState(null);


  const handleChange = (e) => {
    setKodeJoin(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await joinKuis(kodeJoin)
    if(response.status == 'success'){
      navigate('/kerjakan-kuis', {state : {kuis: response.kuis}})
      setIsJoin(false)
      setIsJoin(null)
    } else {
      alert("Kode Join Salah")
    }
  }
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-20 px-5">
        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg w-[400px]">
          <h2 className="text-2xl font-bold mb-4 text-center">Join Kuis</h2>
          <input  
            type="text"
            placeholder="Masukkan Kode Kuis"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4 outline-none"
          />

          <div className="flex items-center justify-center">
            <button onClick={() => setIsJoin(false)} className="bg-red-500 text-white py-1 px-4 rounded me-3">Batal</button>
            <button type="submit" className="bg-violet-500 text-white py-1 px-4 rounded">Join</button>
          </div>
        </form>
      </div>
    </>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [isJoin, setIsJoin] = useState(false);
  const [user, setUser] = useState(null);
  const token = Cookies.get('authToken');

  useEffect(()=>{
    getAuthToken();
  }, [])

  const getAuthToken = async () => {
    if (token !== undefined) {
      const response = await getUserById(token);
      setUser(response.user);
    }
  }

  const handleBuatKuis = () => {
    if (user !== null){
      navigate('/dashboard')
    } else {
      alert("Silahkan login terlebih dahulu")
      navigate('/login')
    }
  }

  const handleJoinKuis = () => {
    if (user !== null){
      setIsJoin(true);
    } else {
      alert("Silahkan login terlebih dahulu")
      navigate('/login')
    }
  }

  return (
    <>
      <Navbar />
      <section className="max-w-[1300px] mx-auto h-screen flex items-center">
        <div className="grid md:grid-cols-2 items-center gap-3">
          <div className="pb-36 pt-48 px-4 mx-auto max-w-screen-xl text-start">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-slate-700 md:text-4xl lg:text-5xl dark:text-white">
              Selamat Datang di KuisKu
            </h1>
            <p className="mb-8 font-medium text-slate-700 lg:text-xl">
            KuisKu: Aplikasi kuis interaktif untuk guru dan siswa. Membantu pembelajaran lebih seru dengan fitur pembuatan kuis, penilaian otomatis, dan analisis hasil untuk meningkatkan proses belajar mengajar.
            </p>
            <div className="flex gap-x-2">
              {user?.role == 'siswa' ? 
              <></>
              :
              <button onClick={handleBuatKuis} className='px-4 py-1 border rounded bg-violet-600 text-white text-sm font-medium'>Buat Kuis</button>
              }
              <button onClick={handleJoinKuis} className='px-4 py-1 border border-violet-600 rounded bg-white text-violet-600 text-sm font-medium'>Join Kuis</button>
            </div>
          </div>
          <div>
            <img src={landing} className="w-[400px] mx-auto rounded-full shadow-lg border-2 border-violet-600" />
          </div>
        </div>
      </section>

      {isJoin && <PopupJoinKuis setIsJoin={setIsJoin}/>}
    </>
  );
};

export default Home;
