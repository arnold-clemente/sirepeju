export const getUser = async (user) => {
    const response = await axios.post('/api/auth/user', user)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const updateProfile = async (user) => {
    const res = await axios.post('/api/auth/update', user)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}