import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteKuis } from '../../api/kuis';

const CardKuis = ({refresh, idKuis,judul}) => {
  const navigate = useNavigate();
  const handleDetail = () => {
    navigate(`/dashboard/detail-kuis`, {state : {id: idKuis}});
  }

  const handleDelete = async () => {
    alert("Apakah anda yakin ingin menghapus kuis ini?");
    await deleteKuis(idKuis);
    refresh((prev) => !prev);
  }
  return (
    <div className=" p-6 bg-white border border-gray-200 rounded-lg relative">
        <a href="#">
            <h5 className="mb-2 text-lg font-bold text-gray-900">{judul}</h5>
        </a>
        <div className='flex items-center gap-x-2'>
          <button onClick={handleDetail} className='px-4 py-1 border rounded bg-violet-600 text-white text-sm font-medium'>Detail</button>
          <button onClick={handleDelete} className='px-4 py-1 border rounded bg-red-500 text-white text-sm font-medium'>Hapus</button>
          
        </div>
    </div>
  )
}

export default CardKuis