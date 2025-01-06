import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { getUserById } from '../api/user';
import { createKuis } from '../api/kuis';

const BuatKuis = ({refresh, setPopup}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [kuisBaru, setKuisBaru] = useState("");

  useEffect(()=>{
    getAuthToken();
  }, [])

  const getAuthToken = async () => {
    const token = Cookies.get('authToken');
    if (token !== undefined) {
      const response = await getUserById(token);
      setUser(response.user);
    }
  }

  const handleChange = (e) => {
    setKuisBaru({...kuisBaru, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (kuisBaru == "") {
      alert("Masukan judul kuis terlebih dahulu");
      return;
    }
    kuisBaru.created_by = user.id
    await createKuis(kuisBaru);
    alert("Berhasil membuat kuis");
    setPopup(false);
    refresh((prev) => !prev);

  }

  return (
    <div className='min-h-[85vh] flex items-center justify-center'>
      <div className='p-5 bg-white rounded-xl border shadow-sm'>
        <h1 className='font-bold text-slate-700 text-center text-xl w-[400px]'>Buat Kuis</h1>
        <form onSubmit={handleSubmit} className='font-medium'>
          <div className='mt-5'>
            <label className='text-slate-700 mb-1'>Judul</label>
            <input type="text" onChange={handleChange} name='title' value={kuisBaru.judul} className='border rounded-md p-3 w-full outline-none' placeholder='Kuis Bahasa Inggris'/>
          </div>
          <div className='flex items-center gap-x-2 mt-5 justify-end'>
            <button onClick={()=>setPopup(false)} className='px-4 py-1 border rounded bg-red-500 text-white text-sm font-medium'>Batal</button>
            <button type='submit' className='px-4 py-1 border rounded bg-violet-500 text-white text-sm font-medium'>Simpan</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BuatKuis