import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { saveHistory, getHistory, savePeserta } from '../api/kuis';
import { getUserById } from '../api/user';

const KerjakanKuis = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { kuis } = location.state || [];
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Jawaban peserta
  const [error, setError] = useState(''); // Validasi error
  const navigate = useNavigate();
  const token = Cookies.get('authToken');

  useEffect(()=>{
    cekHistory();
  }, [])

  
  const cekHistory = async () => {
    let id_kuis = 0;
    kuis.map((item) => {
      id_kuis = item.id_kuis
    });
    
    const response = await getHistory(token, id_kuis);
    const userResponse = await getUserById(token);
    if (response.status === 'success') {
      navigate('/history', { state: { historyData: response.history, skor: response.history.skor, user: userResponse } });
    }
  }

  // Fungsi untuk memilih jawaban
  const handleAnswerSelect = (index, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [index]: answer, // Simpan jawaban peserta berdasarkan index soal
    }));
  };

  // Fungsi untuk validasi dan submit
  const handleSubmit = async () => {
    // Validasi: Pastikan semua soal telah dijawab
    if (Object.keys(selectedAnswers).length < kuis.length) {
      setError('Harap jawab semua soal sebelum submit!');
      return;
    }

    // Reset error jika semua soal sudah dijawab
    setError('');

    // hitung skor
    let totalScore = 0;
    kuis.forEach((item, index) => {
      if (selectedAnswers[index] === item.jawaban) {
        totalScore += 1; // Tambah skor jika jawaban benar
      }
    });

    // Redirect ke halaman history
    const historyData = kuis.map((item, index) => ({
      idKuis: item.id_kuis,
      soal: item.soal,
      jawaban_peserta: selectedAnswers[index],
      jawaban_benar: item.jawaban,
      penjelasan: item.penjelasan,
    }));

    // save peserta
    if (token !== undefined) {
      let id_kuis = 0;
      kuis.map((item) => {
        id_kuis = item.id_kuis
      });
      
      const response = await savePeserta({id_user: token, id_kuis:id_kuis});
      console.log(response);
    }

    setLoading(true);
    // save history
    if (token !== undefined) {
        try {
            for (const item of historyData) {
                const hasil = {
                    id_user: token,
                    id_kuis: item.idKuis,
                    soal: item.soal,
                    jawaban_peserta: item.jawaban_peserta,
                    jawaban_benar: item.jawaban_benar,
                    penjelasan: item.penjelasan,
                    skor: totalScore
                };
                await saveHistory(hasil);
            }
        } catch (error) {
            console.error('Error submitting history:', error);
        }
    }
    setLoading(false);


    navigate('/history', { state: { historyData: historyData, skor: totalScore } });
  };

  return (
    <div className='bg-slate-100 min-h-screen relative'>
      <div className="fixed left-0 right-0 top-0 bg-white z-10 md:px-8 border-b shadow-sm">
        <div className="max-w-[1300px] px-8 mx-auto flex justify-between items-center py-4">
          <h6 className='font-semibold text-xl'>Selamat Mengerjakan</h6>
          <Link to={'/'}>
            <button className='px-4 py-1 border rounded bg-red-500 text-white text-sm font-medium'>Keluar</button>
          </Link>
        </div>
      </div>
      <div className='max-w-[1000px] px-8 mx-auto pt-24 font-semibold text-center'>
        {kuis.map((item, index) => (
          <div key={index} className='bg-white rounded-lg p-4 mb-4 border shadow'>
            <h4 className='col-span-4 bg-violet-100 rounded-lg p-4'>{item.soal}</h4>
            <div className='grid sm:grid-cols-4 gap-1 mt-4'>
              {item.pilihan_ganda.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedAnswers[index] === option ? 'bg-green-200' : 'bg-violet-50 hover:bg-green-200'
                  }`}
                  onClick={() => handleAnswerSelect(index, option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        ))}
        {error && <p className='text-red-500 font-medium mt-4'>{error}</p>}
        <button
          className='mt-6 px-6 py-2 bg-blue-500 text-white font-medium rounded'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {loading && 
        <div className='absolute left-0 top-0 right-0 bottom-0 bg-black/20 z-200 flex items-center justify-center'>
          <div className='loader'></div>
        </div>
      }
    </div>
  );
};

export default KerjakanKuis;
