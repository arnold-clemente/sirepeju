export const getIndex = async () => {
    const response = await axios.get('/api/inicio')
        .then((response) => { return response.data })
        .catch((error) => {
            return error
        })

    return response;
}