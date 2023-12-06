export const getOtorgacionesGob = async () => {
    const response = await axios.get('/api/otorgacion-gobernacions')
    return response.data;
}

export const createOtorgacionGob = async (otorgacion) => {
    const res = await axios.post('/api/otorgacion-gobernacion/store', otorgacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const getOtorgacionGob = async (otorgacionId) => {
    const response = await axios.get(`/api/otorgacion-gobernacion/show/${otorgacionId}`)
    return response.data;
}

export const updateOtorgacionGob = async (otorgacion) => {
    const response = await axios.put(`/api/otorgacion-gobernacion/update/${otorgacion.id}`, otorgacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const destroyOtorgacionGob= async (otorgacion) => {
    const response = await axios.delete(`/api/otorgacion-gobernacion/destroy/${otorgacion.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

// para los fundadores 
export const createFundadorGob = async (fundador) => {
    const res = await axios.post('/api/otorgacion-gobernacion-fundador/store', fundador)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const updateFundadorGob = async (fundador) => {
    const response = await axios.put(`/api/otorgacion-gobernacion-fundador/update/${fundador.id}`, fundador)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const destroyFundadorGob= async (fundador) => {
    const response = await axios.delete(`/api/otorgacion-gobernacion-fundador/destroy/${fundador.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}