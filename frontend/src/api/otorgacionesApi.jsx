export const getOtorgaciones = async () => {
    const response = await axios.get('/api/otorgaciones')
    return response.data;
}

// en proceso 
// export const getOtorgacion = async (otorgacionId) => {
//     const response = await axios.get(`/api//${otorgacionId}`)
//     return response.data;
// }

export const createInforme = async (otorgacion) => {
    const res = await axios.post('/api/otorgacion/informe/store', otorgacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const createSeguimiento = async (otorgacion) => {
    const res = await axios.post('/api/otorgacion/seguimiento/store', otorgacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const createFundadores = async (fundadores) => {
    const res = await axios.post('/api/fundadores/store', fundadores)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const createRegistroFinal = async (registro) => {
    const res = await axios.post('/api/otorgacion/registro-final', registro)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const createRegisroPersonaColectiva = async (registro) => {
    const res = await axios.post('/api/registro-persona-colectiva/store', registro, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const getPersonalidades = async () => {
    const response = await axios.get('/api/otorgacion/personalidades')
    return response.data;
}

export const getRevocatorias = async () => {
    const response = await axios.get('/api/otorgacion/revocatorias')
    return response.data;
}

export const createRevocatoria = async (otorgacion) => {
    const res = await axios.post('/api/otorgacion/revocatoria/store', otorgacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}