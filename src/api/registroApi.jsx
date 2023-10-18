export const getRegistros = async () => {
    const response = await axios.get('/api/registros')
    return response.data;
}

export const entregarRegistro= async (registro) => {
    const response = await axios.post(`/api/registro/entregar/${registro.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const createOtorgacion= async (registro) => {
    const response = await axios.post(`/api/otorgacion/store`, registro)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}
