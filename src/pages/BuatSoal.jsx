import React, { useState } from 'react'
import { createSoal, getSoalByIdKuis } from '../api/soal';

const BuatSoal = ({setIsTambahSoal, idKuis, refresh}) => {
  const [loading, setLoading] = useState(false);
  const [newSoal, setNewSoal] = useState({ soal: "", pilihan_ganda: ["", "", "", ""], jawaban: ""});
  const [penjelasan, setPenjelasan] = useState("");
  const [pilihan_ganda, setpilihan_ganda] = useState([
    { id: 1, isCorrect: false },
    { id: 2, isCorrect: false },
    { id: 3, isCorrect: false },
    { id: 4, isCorrect: false },
  ]);

  const pilihpilihan_ganda = (pilihan_gandaId) => {
    setpilihan_ganda(
      pilihan_ganda.map((j) =>
        j.id === pilihan_gandaId ? { ...j, isCorrect: true } : { ...j, isCorrect: false }
      )
    );
    setNewSoal((prev) => ({
      ...prev,
      jawaban: prev.pilihan_ganda[pilihan_gandaId - 1], // pilihan_ganda sesuai ID
    }));
  };

  const handleChangePenjelasan = (e) => {
    setPenjelasan(e.target.value);
  }

  const handleChangeSoal = (e) => {
    setNewSoal({ ...newSoal, soal: e.target.value });
  };

  const handleChangepilihan_ganda = (index, value) => {
    const updatedpilihan_ganda = [...newSoal.pilihan_ganda];
    updatedpilihan_ganda[index] = value;
    setNewSoal({ ...newSoal, pilihan_ganda: updatedpilihan_ganda });

    // Perbarui jawaban jika pilihan_ganda benar berubah
    const correctIndex = pilihan_ganda.findIndex((j) => j.isCorrect);
    if (correctIndex === index) {
      setNewSoal({ ...newSoal, pilihan_ganda: updatedpilihan_ganda, jawaban: value });
    }
  };

  const handleSimpan = async () => {
    if(newSoal.soal === "" || newSoal.pilihan_ganda.includes("")) return alert('Semua field harus diisi');
    newSoal.id_kuis = idKuis;
    newSoal.penjelasan = penjelasan;

    setLoading(true)
    const response = await createSoal(newSoal);
    console.log(response)
    setLoading(false)

    // Tambahkan logika simpan ke database jika diperlukan
    setIsTambahSoal(false);
    setNewSoal({ soal: "", pilihan_ganda: ["", "", "", ""], jawaban: ""});
    setpilihan_ganda([
      { id: 1, isCorrect: false },
      { id: 2, isCorrect: false },
      { id: 3, isCorrect: false },
      { id: 4, isCorrect: false },
    ])

    refresh((prev) => !prev);
  };
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-slate-500/50 flex items-center justify-center px-5'>
      <div className="w-[1000px] mx-auto p-5 bg-white relative rounded-xl mb-5">
        <div className="input-judul-kuis flex items-center gap-x-2">
          <input
            type="text"
            className="w-full h-12 border border-slate-200 rounded-md px-3 outline-none"
            placeholder="Masukan pertanyaan"
            onChange={handleChangeSoal}
            value={newSoal.soal}
          />
        </div>
        <div className="grid md:grid-cols-4 gap-2 mt-3">
          {pilihan_ganda.map(({ id: pilihan_gandaId, isCorrect }, index) => (
            <div key={pilihan_gandaId} className="relative">
              <div
                onClick={() => pilihpilihan_ganda(pilihan_gandaId)}
                className={`absolute right-2 top-2 cursor-pointer w-6 h-6 rounded-full ${
                  isCorrect ? 'bg-green-500' : 'bg-slate-200'
                }`}
              ></div>
              <input
                type="text"
                className="w-full font-medium h-36 border border-slate-200 rounded-md px-3 outline-none"
                placeholder="Tulis jawaban"
                onChange={(e) => handleChangepilihan_ganda(index, e.target.value)}
                value={newSoal.pilihan_ganda[index]}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-x-2 mt-4">
          <input
            type="text"
            className="w-full h-12 border border-slate-200 rounded-md px-3 outline-none"
            placeholder="Berikan penjelasan"
            onChange={handleChangePenjelasan}
          />
        </div>
        <div className='flex items-center gap-3 w-[160px] ml-auto'>
          <button
            onClick={() => setIsTambahSoal(false)}
            className='px-4 py-1 rounded bg-red-500 text-white text-sm font-medium block mt-4 ml-auto'
          >
            Batal
          </button>
          <button
            onClick={handleSimpan}
            className='px-4 py-1 rounded bg-violet-500 text-white text-sm font-medium block mt-4 ml-auto'
          >
            Simpan
          </button>
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

export default BuatSoal