import React, { useEffect, useState } from 'react'
import { FaCheck, FaChevronLeft } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import BuatSoal from './BuatSoal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getSoalByIdKuis, deleteSoal } from '../api/soal';
import { publishKuis, getKodeJoin } from '../api/kuis';

const DetailKuis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { id } = location.state || {};
  const [isTambahSoal, setIsTambahSoal] = useState(false);
  const [allSoal, setAllSoal] = useState([]);
  const [kodeJoin, setKodeJoin] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(()=>{
    getAllSoal();
    kodeJoinGet();
  }, [refresh])

  const getAllSoal = async () => {
    const response = await getSoalByIdKuis(id);
    setAllSoal(response.soal)
  }
  
  const kodeJoinGet = async () => {
    const response = await getKodeJoin(id);
    setKodeJoin(response.kode);
  }

  const handleDelete = async (id) => {
    await deleteSoal(id);
    getAllSoal();
  }

  const handlePublish = async () => {
    setLoading(true)
    const response = await publishKuis(id);
    setLoading(false)
    alert('Kuis berhasil dipublish');
    setKodeJoin(response.publish.kode_join);
  }

  const handleDaftarPeserta = () => {
    navigate('/daftar-peserta', { state: { id_kuis: id } });
  }

  return (
    <div className='bg-slate-100 min-h-screen relative'>
      <div className="fixed left-0 right-0 top-0 bg-white z-10 md:px-8 border-b shadow-sm">
        <div className="max-w-[1300px] px-8 mx-auto flex justify-between items-center py-4">
            <div className='flex items-center gap-x-2'>
              <Link to={'/dashboard'}><FaChevronLeft className='cursor-pointer text-slate-400 mt-0.5'/></Link>
              <span className="text-blue-700 text-xl">Detail Kuis</span>
            </div>
            <button onClick={handlePublish} className='px-4 py-1 border rounded bg-green-500 text-white text-sm font-medium'>Publish</button>
        </div>
      </div>

      <div className="max-w-[1240px] p-4 mx-auto mt-16 grid md:grid-cols-4 gap-2 py-10">
        <div className='col-span-3 md:col-span-1'>
          <div className='p-3 border rounded-lg bg-white text-slate-600'>
            <div className='text-center my-5'>
              <h6 className='font-medium'>Kode Join</h6>
              <h4 className='font-bold text-3xl'>{kodeJoin !== null ? kodeJoin : '-'}</h4>
            </div>
            <button onClick={handleDaftarPeserta} className='px-4 py-2 border w-full rounded bg-violet-500 text-white text-sm font-medium'>Lihat peserta</button>
          </div>
        </div>
        <div className='col-span-3'>
          <div className='p-3 border rounded-lg bg-white flex items-center justify-between mb-2'>
            <h6 className='font-medium text-lg text-slate-700'>Daftar soal</h6>
            <button onClick={() => setIsTambahSoal(true)} className='px-4 py-1 rounded bg-violet-500 text-white text-sm font-medium'>Tambah Soal</button>
          </div>
          {allSoal.map((soal) => (
            <div key={soal.id} className='p-3 border rounded-lg bg-white relative mb-2'>
              <button onClick={() => handleDelete(soal.id)} className='px-4 py-1 rounded bg-red-500 text-white text-sm font-medium absolute right-2 top-2'>hapus</button>
              <h6 className='font-medium text-slate-700'>{soal.soal}</h6>
              <div className='mt-4 grid grid-cols-2 gap-2'>
                <p className='flex items-center gap-2'>{soal.pilihan_ganda[0] === soal.jawaban ? <FaCheck size={13} className='text-green-500'/> : <FaX size={13} className='text-red-500'/>} {soal.pilihan_ganda[0]}</p>
                <p className='flex items-center gap-2'>{soal.pilihan_ganda[1] === soal.jawaban ? <FaCheck size={13} className='text-green-500'/> : <FaX size={13} className='text-red-500'/>} {soal.pilihan_ganda[1]}</p>
                <p className='flex items-center gap-2'>{soal.pilihan_ganda[2] === soal.jawaban ? <FaCheck size={13} className='text-green-500'/> : <FaX size={13} className='text-red-500'/>} {soal.pilihan_ganda[2]}</p>
                <p className='flex items-center gap-2'>{soal.pilihan_ganda[3] === soal.jawaban ? <FaCheck size={13} className='text-green-500'/> : <FaX size={13} className='text-red-500'/>} {soal.pilihan_ganda[3]}</p>
              </div>
              <p className='text-sm mt-2 '>Penjelasan : {soal.penjelasan}</p>
            </div>
          ))}
        </div>
      </div>

      {isTambahSoal && 
        <BuatSoal setIsTambahSoal={setIsTambahSoal} idKuis={id} refresh={setRefresh}/>
      }

      {loading && 
        <div className='absolute left-0 top-0 right-0 bottom-0 bg-black/20 z-200 flex items-center justify-center'>
          <div className='loader'></div>
        </div>
      }
    </div>
  )
}

export default DetailKuis