export const getModificaciones = async () => {
    const response = await axios.get('/api/modificaciones')
    return response.data;
}

export const getOtorgacionMod = async (otorgacion) => {
    const response = await axios.post('/api/modificacion-show-otorgacion', otorgacion)
    return response.data;
}

export const getAdecuacionMod = async (adecuacion) => {
    const response = await axios.post('/api/modificacion-show-adecuacion', adecuacion)
    return response.data;
}
