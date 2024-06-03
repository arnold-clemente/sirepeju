export const getTramites = async () => {
    const response = await axios.get('/api/tramites')
        .then((response) => { return response.data })
        .catch((error) => {
            return error
        })

    return response;
}

export const getFinalizados = async () => {
    const response = await axios.get('/api/finalizados')
        .then((response) => { return response.data })
        .catch((error) => {
            return error
        })

    return response;
}

export const getOtorgacion = async (otorgacionId) => {
    
    const response = await axios.get(`/api/tramites/otorgacion/${otorgacionId}`)
        .then((response) => { return response.data })
        .catch((error) => {
            return error
        })

    return response;
}

export const getAdecuacion = async (adecuacionId) => {
    const response = await axios.get(`/api/tramites/adecuacion/${adecuacionId}`)
        .then((response) => { return response.data })
        .catch((error) => {
            return error
        })

    return response;
}


export const getGobernacion = async (gobernacionId) => {
    const response = await axios.get(`/api/tramites/gobernacion/${gobernacionId}`)
        .then((response) => { return response.data })
        .catch((error) => {
            return error
        })

    return response;
}