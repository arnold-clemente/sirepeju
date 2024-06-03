export const getRequisitos = async () => {
    const response = await axios.get('/api/requisitos')
        .then((response) => { return response.data })
        .catch((error) => {
            return error
        })

    return response;
}

export const getRequisito = async (requisitoId) => {
    
    const response = await axios.get(`/api/requisitos/${requisitoId}`)
        .then((response) => { return response.data })
        .catch((error) => {
            return error
        })

    return response;
}