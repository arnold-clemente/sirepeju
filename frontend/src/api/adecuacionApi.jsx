export const getAdecuaciones = async () => {
    const response = await axios.get('/api/adecuaciones')
    return response.data;
}

export const getAdecuacion = async (adecuacionId) => {
    const response = await axios.get(`/api/adecuacion/show/${adecuacionId}`)
    return response.data;
}

export const createAdecuacion = async (adecuacion) => {
    const response = await axios.post('/api/adecuacion/store', adecuacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const createSeguimiento = async (adecuacion) => {
    const res = await axios.post('/api/adecuacion/seguimiento/store', adecuacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const createInforme = async (adecuacion) => {
    const res = await axios.post('/api/adecuacion/informe/store', adecuacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const createFundadores = async (fundadores) => {
    const res = await axios.post('/api/fundadores/adecuacion/store', fundadores)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const createRegistroFinal = async (adecuacion) => {
    const res = await axios.post('/api/adecuacion/registro-final', adecuacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const createRegisroPersonaColectiva = async (adecuacion) => {
    const res = await axios.post('/api/adecuacion-persona-colectiva/store', adecuacion, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const getPersonalidades = async () => {
    const response = await axios.get('/api/adecuacion/personalidades')
    return response.data;
}

export const getRevocatorias = async () => {
    const response = await axios.get('/api/adecuacion/revocatorias')
    return response.data;
}

export const createRevocatoria = async (adecuacion) => {
    const res = await axios.post('/api/adecuacion/revocatoria/store', adecuacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

// para los archivados 
export const getArchivados = async () => {
    const response = await axios.get('/api/adecuacion/archivados')
    return response.data;
}

export const archivarAdecuacion = async (adecuacion) => {
    const response = await axios.post(`/api/adecuacion/archivar/${adecuacion.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const desarchivarAdecuacion = async (adecuacion) => {
    const response = await axios.post(`/api/adecuacion/desarchivar/${adecuacion.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

// para los caducados 

export const getCaducados = async () => {
    const response = await axios.get('/api/adecuacion/caducados')
    return response.data;
}

export const caducarAdecuacion= async (adecuacion) => {
    const response = await axios.post(`/api/adecuacion/caducar/${adecuacion.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

