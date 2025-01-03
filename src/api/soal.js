import axios from "axios";

export const createSoal = async (data) => {
  try {
    const response = await axios.post(`https://kuis.programmergenz.site/api/soal/create`, data);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const getSoalByIdKuis = async (id_kuis) => {
  try {
    const response = await axios.get(`https://kuis.programmergenz.site/api/soal/idkuis/${id_kuis}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const deleteSoal = async (id) => {
  try {
    const response = await axios.delete(`https://kuis.programmergenz.site/api/soal/${id}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

