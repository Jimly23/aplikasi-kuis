import React, { useEffect, useState } from 'react'
import { getHistory, getPeserta } from '../api/kuis'
import { getUserById } from '../api/user';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const DaftarPeserta = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id_kuis } = location.state || {};
  const [peserta, setPeserta] = useState([])

  useEffect(()=>{
    getAllPeserta();
  }, [])

  const getAllPeserta = async () => {
    try {
      const response = await getPeserta(id_kuis);
      const pesertaList = response.peserta;
  
      const fetchedPeserta = await Promise.all(
        pesertaList.map(async (item) => {
          const userResponse = await getUserById(item.id_user);
          return userResponse.user; // Mengambil data user
        })
      );
  
      setPeserta(fetchedPeserta); // Menyimpan semua peserta ke dalam state
    } catch (error) {
      console.error("Error fetching peserta:", error);
    }
  };

  const handleCheckPeserta = async (id_user) => {
    const response = await getHistory(id_user, id_kuis);
    const userResponse = await getUserById(id_user);

    if (response.status === 'success') {
      navigate('/history-admin', { state: { historyData: response.history, skor: response.history.skor, user: userResponse } });
    }
  }

  return (
    <div className='bg-slate-100 min-h-screen'>
      <div className="fixed left-0 right-0 top-0 bg-white z-10 md:px-8 border-b">
        <div className="max-w-[1300px] px-8 mx-auto flex justify-between items-center py-4">
          <div className="logo text-3xl font-bold relative">
            <span className="text-violet-600 text-xl">Daftar Peserta</span>
          </div>
          <div className='flex items-center gap-x-2'>
            <Link to={'/dashboard'}>
              <button className='px-4 py-1 border rounded bg-violet-600 text-white text-sm font-medium'>Dashboard</button>
            </Link>
          </div>
        </div>
      </div>

      <div className='max-w-[1300px] px-8 mx-auto pt-24  grid grid-cols-2 lg:grid-cols-4 gap-2'>
        {peserta.map((item, index) => (
          <div onClick={() => handleCheckPeserta(item.id)} key={index} className='bg-white flex items-center justify-between rounded-lg p-5 mb-3 border shadow-sm font-semibold text-slate-700 cursor-pointer'>
            <h5>{item.username}</h5>
            <FaChevronRight />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DaftarPeserta