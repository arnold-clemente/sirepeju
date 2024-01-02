import { token_expired, permission_denied } from "../components/AxiosError"

export const getModificacionesAdecuacion = async () => {
    const response = await axios.get('/api/modificaciones-adecuacion')
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

export const createModificacion = async (adecuacion) => {
    const response = await axios.post('/api/modificacion-adecuacion-create', adecuacion)
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

export const updateAdecuacionModificacion = async (adecuacion) => {
    const response = await axios.post(`/api/modificacion-adecuacion-update`, adecuacion, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
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

// para seguimietno 
export const createSeguimientoMod = async (adecuacion) => {
    const response = await axios.post('/api/adecuacion/seguimiento/modificacion', adecuacion)
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
// para el informe
export const createInformeMod = async (adecuacion) => {
    const response = await axios.post('/api/adecuacion/informe/modificacion', adecuacion)
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
export const getFundadoresAdecuacion = async (adecuacion_id) => {
    const response = await axios.get(`/api/modificacion-adecuacion-fundadores/${adecuacion_id}`)
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

export const createFundadorAde = async (fundador) => {
    const response = await axios.post('/api/modificacion-adecuacion-fundador-store', fundador)
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

export const updateFundadorAde = async (fundador) => {
    const response = await axios.put(`/api/modificacion-adecuacion-fundador-update/${fundador.id}`, fundador)
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

export const destroyFundadorAde = async (fundador) => {
    const response = await axios.delete(`/api/modificacion-adecuacion-fundador-destroy/${fundador.id}`)
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