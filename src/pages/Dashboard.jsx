import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import CardKuis from '../components/templates/CardKuis';
import BuatKuis from './BuatKuis';
import { getUserById } from '../api/user';
import { getAllKuis } from '../api/kuis';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isGuru, setIsGuru] = useState(false);
  const [allKuis, setAllKuis] = useState([]);
  const [popupBuatKuis, setPopupBuatKuis] = useState(false);

  useEffect(()=>{
    getAuthToken();
  }, [])

  const getAuthToken = async () => {
    const token = Cookies.get('authToken');
    if (token !== undefined) {
      setLoading(true);
      const response = await getUserById(token);
      if (response.user.role == 'guru') {
        setIsGuru(true);
        getKuis(token);
      }
    }
  }

  const getKuis = async (token) => {
    const response = await getAllKuis(token);
    setAllKuis(response.kuis)
    setLoading(false);
  }

  const logout = () => {
    Cookies.remove('authToken');
    navigate('/')
  }

  return (
    <div className='relative'>
      <div className="fixed left-0 right-0 top-0 bg-white z-10 md:px-8">
        <div className="max-w-[1300px] px-8 mx-auto flex justify-between items-center py-4">
          <div className="logo text-3xl font-bold relative">
            <span className="text-violet-600">Guru</span>
          </div>
          <div className='flex items-center gap-x-2'>
            {isGuru && <button onClick={() => setPopupBuatKuis(true)} className='px-4 py-1 border rounded bg-violet-500 text-white text-sm font-medium'>Buat Kuis</button>}
            <button onClick={logout} className='px-4 py-1 border rounded bg-red-500 text-white text-sm font-medium'>Logout</button>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 min-h-[95vh] mt-16">
        <div className="max-w-[1240px] p-4 mx-auto">
          {popupBuatKuis ?
            <BuatKuis setPopup={setPopupBuatKuis}/>
            :
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
              {allKuis.map((kuis) => (
                <div key={kuis.id}>
                  <CardKuis idKuis={kuis.id} judul={kuis.title}/>  
                </div>
              ))}
            </div>
          }
        </div>
      </div>

      {loading && 
        <div className='absolute left-0 top-0 right-0 bottom-0 bg-black/20 z-200 flex items-center justify-center'>
          <div className='loader'></div>
        </div>
      }
    </div>
  )
}

export default Dashboard