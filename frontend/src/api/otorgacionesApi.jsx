export const getOtorgaciones = async () => {
    const response = await axios.get('/api/otorgaciones')
    return response.data;
}

export const getOtorgacion = async (otorgacionId) => {
    const response = await axios.get(`/api/otorgacion/show/${otorgacionId}`)
    return response.data;
}

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

export const getArchivados = async () => {
    const response = await axios.get('/api/otorgacion/archivados')
    return response.data;
}

export const archivarOtorgacion = async (otorgacion) => {
    const response = await axios.post(`/api/otorgacion/archivar/${otorgacion.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const desarchivarOtorgacion = async (otorgacion) => {
    const response = await axios.post(`/api/otorgacion/desarchivar/${otorgacion.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const getCaducados = async () => {
    const response = await axios.get('/api/otorgacion/caducados')
    return response.data;
}

export const caducarOtorgacion= async (otorgacion) => {
    const response = await axios.post(`/api/otorgacion/caducar/${otorgacion.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const createRevocatoria = async (otorgacion) => {
    const res = await axios.post('/api/otorgacion/revocatoria/store', otorgacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}