export const getRoles = async () => {
    const response = await axios.get('/api/roles')
    return response.data;
}

export const showRol = async (rolId) => {
    const response = await axios.get(`/api/rol/show/${rolId}`)
    return response.data;
}

export const getPermisos = async () => {
    const response = await axios.get('/api/permisos')
    return response.data;
}

export const createRol = async (rol) => {
    const res = await axios.post('/api/rol/store', rol)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const getRol = async (rolId) => {
    const response = await axios.get(`/api/rol/edit/${rolId}`)
    return response.data;
}

export const updateRol = async (rol) => {
    const response = await axios.put(`/api/rol/update/${rol.id}`, rol)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const destroyRol = async (rol) => {
    const response = await axios.delete(`/api/rol/destroy/${rol.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}