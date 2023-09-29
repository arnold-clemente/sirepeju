export const getOtorgaciones = async () => {
    const response = await axios.get('/api/otorgaciones')
    return response.data;
}

export const createRegistroFinal = async (registro) => {
    const res = await axios.post('/api/otorgacion/registro-final', registro)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}