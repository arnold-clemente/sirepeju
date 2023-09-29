export const createRegisroPersonaColectiva = async (registro) => {
    const res = await axios.post('/api/registro-persona-colectiva/store', registro)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}