export const createRegisroPersonaColectiva = async (registro) => {
    // return console.log(registro)
    const res = await axios.post('/api/registro-persona-colectiva/store', registro, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}