import { BrowserRouter as Router, Routes, Route } from "react-router"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import BuatSoal from "./pages/BuatSoal"
import DetailKuis from "./pages/DetailKuis"
import KerjakanKuis from "./pages/KerjakanKuis"
import HistoryPengerjaan from "./pages/HistoryPengerjaan"
import DaftarPeserta from "./pages/DaftarPeserta"
import HistoryAdmin from "./pages/HistoryAdmin"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buat-soal" element={<BuatSoal />} />
        <Route path="/dashboard/detail-kuis" element={<DetailKuis />} />
        <Route path="/daftar-peserta" element={<DaftarPeserta />} />
        <Route path="/kerjakan-kuis" element={<KerjakanKuis />} />
        <Route path="/history" element={<HistoryPengerjaan />} />
        <Route path="/history-admin" element={<HistoryAdmin />} />
      </Routes>
    </Router>
  )
}

export default App
