import React, { useState } from 'react'

const BuatSoal = () => {
  const [newSoal, setNewSoal] = useState({soal:"", jawaban:[], correct_answer: ""});

  const [jawaban, setJawaban] = useState([
    { id: 1, isCorrect: false },
    { id: 2, isCorrect: false },
    { id: 3, isCorrect: false },
    { id: 4, isCorrect: false },
  ]);

  const pilihJawaban = (jawabanId) => {
    setJawaban(
      jawaban.map((j) =>
        j.id === jawabanId ? { ...j, isCorrect: true } : { ...j, isCorrect: false }
      )
    );
  };

  const handleChange = (e) => {
    setNewSoal({...newSoal, [e.target.name]: e.target.value});
  }

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-slate-500/50 flex items-center justify-center'>
      <div className="w-[1000px] mx-auto p-5 bg-white relative rounded-xl mb-5">
        <div className="input-judul-kuis flex items-center gap-x-2">
          <input
            type="text"
            className="w-full h-12 border border-slate-200 rounded-md px-3 outline-none"
            placeholder="Masukan pertanyaan"
            onChange={handleChange}
            value={newSoal.soal}
          />
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {jawaban.map(({ id: jawabanId, isCorrect }) => (
            <div key={jawabanId} className="relative">
              <div
                onClick={() => pilihJawaban(jawabanId)}
                className={`absolute right-2 top-2 cursor-pointer w-6 h-6 rounded-full ${
                  isCorrect ? 'bg-green-500' : 'bg-slate-200'
                }`}
              ></div>
              <input
                type="text"
                className="w-full font-medium h-36 border border-slate-200 rounded-md px-3 outline-none"
                placeholder="Tulis jawaban disini"
              />
            </div>
          ))}
        </div>
        <div className='flex items-center gap-3 w-[160px] ml-auto'>
          <button onClick={() => setIsTambahSoal(false)} className='px-4 py-1 rounded bg-red-500 text-white text-sm font-medium block mt-4 ml-auto'>Batal</button>
          <button className='px-4 py-1 rounded bg-violet-500 text-white text-sm font-medium block mt-4 ml-auto'>Simpan</button>
        </div>
      </div>
    </div>
  )
}

export default BuatSoal