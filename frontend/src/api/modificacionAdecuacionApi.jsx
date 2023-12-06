export const getModificacionesAdecuacion = async () => {
    const response = await axios.get('/api/modificaciones-adecuacion')
    return response.data;
}

export const createModificacion = async (adecuacion) => {
    const res = await axios.post('/api/modificacion-adecuacion-create', adecuacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const updateAdecuacionModificacion = async (adecuacion) => {
    const res = await axios.post(`/api/modificacion-adecuacion-update`, adecuacion, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

// para seguimietno 
export const createSeguimientoMod = async (adecuacion) => {
    const res = await axios.post('/api/adecuacion/seguimiento/modificacion', adecuacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}
// para el informe
export const createInformeMod = async (adecuacion) => {
    const res = await axios.post('/api/adecuacion/informe/modificacion', adecuacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}


// para los fundadores 
export const getFundadoresAdecuacion = async (adecuacion_id) => {
    const response = await axios.get(`/api/modificacion-adecuacion-fundadores/${adecuacion_id}`)
    return response.data;
}

export const createFundadorAde = async (fundador) => {
    const res = await axios.post('/api/modificacion-adecuacion-fundador-store', fundador)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const updateFundadorAde= async (fundador) => {
    const response = await axios.put(`/api/modificacion-adecuacion-fundador-update/${fundador.id}`, fundador)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const destroyFundadorAde= async (fundador) => {
    const response = await axios.delete(`/api/modificacion-adecuacion-fundador-destroy/${fundador.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}