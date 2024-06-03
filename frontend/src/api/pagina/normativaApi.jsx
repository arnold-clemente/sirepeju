export const getNormativas = async () => {
    const response = await axios.get('/api/normativas')
        .then((response) => { return response.data })
        .catch((error) => {
            return error
        })

    return response;
}