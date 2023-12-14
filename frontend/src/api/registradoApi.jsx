export const getRegistrados = async () => {
    const response = await axios.get('/api/registrados')
    return response.data;
}

export const getRegistrado= async (registradoId) => {
    const response = await axios.get(`/api/registrado/show/${registradoId}`)
    return response.data;
}

export const createRegistrado = async (registrado) => {
    const res = await axios.post('/api/registrado/store', registrado)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const updateRegistrado = async (registrado) => {
    const response = await axios.put(`/api/registrado/update/${registrado.id}`, registrado)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const destroyRegistrado = async (registrado) => {
    const response = await axios.delete(`/api/registrado/destroy/${registrado.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}