import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';

const HistoryAdmin = () => {
  const location = useLocation();
  const [skorKuis, setSkorKuis] = useState(0);
  const { historyData, skor, user } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    hitungSkor();
  }, [])

  const hitungSkor = () => {
    let skor = 0;
    historyData.forEach((item) => {
      if (item.jawaban_peserta === item.jawaban_benar) {
        skor += 1;
      }
    });
    setSkorKuis(skor);
  }

  return (
    <div className='bg-slate-100 min-h-screen'>
      <div className="fixed left-0 right-0 top-0 bg-white z-10 md:px-8 border-b shadow-sm">
        <div className="max-w-[1300px] px-8 mx-auto flex justify-between items-center py-4">
          <h6 className='font-semibold text-xl'>History Jawaban</h6>
          <button
            className='px-4 py-1 border rounded bg-violet-600 text-white text-sm font-medium'
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
        </div>
      </div>
      <div className='max-w-[1000px] px-8 mx-auto pt-24'>
        <div className='grid grid-cols-2 mb-5 gap-2 items-center  text-center rounded-lg h-[100px] text-white'>
          <h2 className='col-span-2 text-4xl font-semibold  border bg-violet-500 py-5 rounded-lg flex flex-col'><span className='text-xl'>{user.user.username}</span> </h2>
          <h2 className='text-4xl font-semibold  border bg-green-500 py-5 rounded-lg flex flex-col'><span className='text-sm'>Benar</span> {skor || skorKuis}</h2>
          <h2 className='text-4xl font-semibold  border bg-orange-500 py-5 rounded-lg flex flex-col'><span className='text-sm'>Dari</span> {historyData.length}</h2>
        </div>
        <div className='mt-24'>
          {historyData.map((item, index) => (
            <div key={index} className={`relative bg-white rounded-lg p-4 mb-4 border border-gray-300`}>
              <h4 className='font-semibold mb-5'>{item.soal}</h4>
              <p>
                <strong className='font-semibold'>Jawaban Anda:</strong> {item.jawaban_peserta || 'Tidak dijawab'}
              </p>
              <p>
                <strong className='font-semibold'>Jawaban Benar:</strong> {item.jawaban_benar}
              </p>
              <p className='mt-5 text-sm'>
                <strong className='font-semibold'>Penjelasan:</strong> {item.penjelasan}
              </p>
              <div className='absolute right-5 top-5'>
                {item.jawaban_peserta === item.jawaban_benar ? <FaCheck className='text-green-500'/> : <FaX className='text-red-500'/>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryAdmin;
