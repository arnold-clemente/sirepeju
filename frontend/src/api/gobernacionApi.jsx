
export const getGobernacions = async () => {
    const response = await axios.get('/api/gobernacions')
    return response.data;
}

export const getGobernacion = async (gobernacionId) => {
    const response = await axios.get(`/api/gobernacion/show/${gobernacionId}`)
    return response.data;
}

export const createGobernacion = async (gobernacion) => {
    const res = await axios.post('/api/gobernacion/store', gobernacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const updateGobernacion= async (gobernacion) => {
    const response = await axios.put(`/api/gobernacion/update/${gobernacion.id}`, gobernacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const destroyGobernacion= async (gobernacion) => {
    const response = await axios.delete(`/api/gobernacion/destroy/${gobernacion.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const passwordGobernacion = async (gobernacion) => {
    const response = await axios.post(`/api/gobernacion/password`, gobernacion)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}
