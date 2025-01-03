import React, { useState } from 'react';

const Soal = ({ id, hapusPertanyaan }) => {

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

  return (
    
      <div className="w-[1000px] mx-auto p-5 bg-white relative pt-12 rounded-xl mb-5">
        <div className="input-judul-kuis flex items-center gap-x-2">
          <input
            type="text"
            className="w-full h-12 border border-slate-200 rounded-md px-3 outline-none"
            placeholder="Masukan pertanyaan"
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
        <button
          onClick={() => hapusPertanyaan(id)}
          className="absolute right-5 top-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm"
        >
          Hapus
        </button>
      </div>
  );
};

export default Soal;
