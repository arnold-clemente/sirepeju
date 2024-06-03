import { token_expired, permission_denied } from "../components/AxiosError"

export const getOtorgacionesGob = async () => {
    const response = await axios.get('/api/otorgacion-gobernacions')
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}

export const createOtorgacionGob = async (otorgacion) => {
    const response = await axios.post('/api/otorgacion-gobernacion/store', otorgacion)
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}

export const getOtorgacionGob = async (otorgacionId) => {
    const response = await axios.get(`/api/otorgacion-gobernacion/show/${otorgacionId}`)
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}

export const updateOtorgacionGob = async (otorgacion) => {
    const response = await axios.put(`/api/otorgacion-gobernacion/update/${otorgacion.id}`, otorgacion)
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}

export const destroyOtorgacionGob = async (otorgacion) => {
    const response = await axios.delete(`/api/otorgacion-gobernacion/destroy/${otorgacion.id}`)
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}

// para los fundadores 
export const createFundadorGob = async (fundador) => {
    const response = await axios.post('/api/otorgacion-gobernacion-fundador/store', fundador)
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}

export const updateFundadorGob = async (fundador) => {
    const response = await axios.put(`/api/otorgacion-gobernacion-fundador/update/${fundador.id}`, fundador)
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}

export const destroyFundadorGob = async (fundador) => {
    const response = await axios.delete(`/api/otorgacion-gobernacion-fundador/destroy/${fundador.id}`)
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}