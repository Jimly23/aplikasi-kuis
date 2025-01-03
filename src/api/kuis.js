import axios from "axios";

export const createKuis = async (data) => {
  try {
    const response = await axios.post(`https://kuis.programmergenz.site/api/kuis/create`, data);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const getAllKuis = async (created_by) => {
  try {
    const response = await axios.get(`https://kuis.programmergenz.site/api/kuis/createdby/${created_by}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const deleteKuis = async (id_kuis) => {
  try {
    const response = await axios.delete(`https://kuis.programmergenz.site/api/kuis/${id_kuis}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const publishKuis = async (id_kuis) => {
  try {
    const response = await axios.post(`https://kuis.programmergenz.site/api/publish/${id_kuis}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const joinKuis = async (kode_join) => {
  try {
    const response = await axios.get(`https://kuis.programmergenz.site/api/join/${kode_join}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const getKodeJoin = async (kuis_id) => {
  try {
    const response = await axios.get(`https://kuis.programmergenz.site/api/join/kode/${kuis_id}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const saveHistory = async (data) => {
  try {
    const response = await axios.post(`https://kuis.programmergenz.site/api/history`, data);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const getHistory = async (id_user, id_kuis) => {
  try {
    const response = await axios.get(`https://kuis.programmergenz.site/api/history/${id_user}/${id_kuis}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const savePeserta = async (data) => {
  try {
    const response = await axios.post(`https://kuis.programmergenz.site/api/peserta`, data);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const getPeserta = async (id_kuis) => {
  try {
    const response = await axios.get(`https://kuis.programmergenz.site/api/peserta/${id_kuis}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}