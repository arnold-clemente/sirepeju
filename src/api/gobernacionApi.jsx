
export const getGobernacions = async () => {
    const response = await axios.get('/api/gobernacions')
    return response.data;
}

export const createGobernacion = async (gobernacion) => {
    const res = await axios.post('/api/gobernacions', gobernacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const getGobernacion = async (gobernacionId) => {
    const response = await axios.get(`/api/gobernacions/${gobernacionId}`)
    return response.data;
}

export const updateGobernacion= async (gobernacion) => {
    const response = await axios.put(`/api/gobernacions/${gobernacion.id}`, gobernacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const destroyGobernacion= async (gobernacion) => {
    const response = await axios.delete(`/api/gobernacions/${gobernacion.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}
