
export const getAdministrativos = async () => {
    const response = await axios.get('/api/administrativos')
    return response.data;
}

export const getAdministrativo = async (adminId) => {
    const response = await axios.get(`/api/administrativo/show/${adminId}`)
    return response.data;
}

export const getEditAdministrativo = async (adminId) => {
    const response = await axios.get(`/api/administrativo/edit/${adminId}`)
    return response.data;
}

export const createAdministrativo = async (administrativo) => {
    const res = await axios.post('/api/administrativo/store', administrativo)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const updateAdministrativo = async (admin) => {
    const response = await axios.put(`/api/administrativo/update/${admin.id}`, admin)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const destroyAdministrativo = async (admin) => {
    const response = await axios.delete(`/api/administrativo/destroy/${admin.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const passwordAdministrativo = async (admin) => {
    const response = await axios.post(`/api/administrativo/password`, admin)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}
