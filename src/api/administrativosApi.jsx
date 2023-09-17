
export const getAdministrativos = async () => {
    const response = await axios.get('/api/administrativos')
    return response.data;
}

export const createAdministrativo = async (administrativo) => {
    const res = await axios.post('/api/administrativos', administrativo)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const getAdministrativo = async (adminId) => {
    const response = await axios.get(`/api/administrativos/${adminId}`)
    return response.data;
}

export const updateAdministrativo = async (admin) => {
    const response = await axios.put(`/api/administrativos/${admin.id}`, admin)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const destroyAdministrativo = async (admin) => {
    const response = await axios.delete(`/api/administrativos/${admin.id}`)
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
