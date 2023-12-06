export const getModificacionesOtorgacion = async () => {
    const response = await axios.get('/api/modificaciones-otorgacion')
    return response.data;
}

export const createModificacion = async (otorgacion) => {
    const res = await axios.post('/api/modificacion-otorgacion-create', otorgacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const updateOtorgacionModificacion = async (otorgacion) => {
    const res = await axios.post(`/api/modificacion-otorgacion-update`, otorgacion, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

// para seguimietno 
export const createSeguimientoMod = async (otorgacion) => {
    const res = await axios.post('/api/otorgacion/seguimiento/modificacion', otorgacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}
// para el informe
export const createInformeMod = async (otorgacion) => {
    const res = await axios.post('/api/otorgacion/informe/modificacion', otorgacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}


// para los fundadores 
export const getFundadoresOtorgacion = async (otorgacion_id) => {
    const response = await axios.get(`/api/modificacion-otorgacion-fundadores/${otorgacion_id}`)
    return response.data;
}

export const createFundadorOtor = async (fundador) => {
    const res = await axios.post('/api/modificacion-otorgacion-fundador-store', fundador)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const updateFundadorOtor = async (fundador) => {
    const response = await axios.put(`/api/modificacion-otorgacion-fundador-update/${fundador.id}`, fundador)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const destroyFundadorOtor = async (fundador) => {
    const response = await axios.delete(`/api/modificacion-otorgacion-fundador-destroy/${fundador.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}