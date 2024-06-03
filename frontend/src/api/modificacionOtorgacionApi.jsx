import { token_expired, permission_denied } from "../components/AxiosError"

export const getModificacionesOtorgacion = async () => {
    const response = await axios.get('/api/modificaciones-otorgacion')
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

export const createModificacion = async (otorgacion) => {
    const response = await axios.post('/api/modificacion-otorgacion-create', otorgacion)
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

export const updateOtorgacionModificacion = async (otorgacion) => {
    const response = await axios.post(`/api/modificacion-otorgacion-update`, otorgacion, {
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
export const createSeguimientoMod = async (otorgacion) => {
    const response = await axios.post('/api/otorgacion/seguimiento/modificacion', otorgacion)
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
export const createInformeMod = async (otorgacion) => {
    const response = await axios.post('/api/otorgacion/informe/modificacion', otorgacion)
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
export const getFundadoresOtorgacion = async (otorgacion_id) => {
    const response = await axios.get(`/api/modificacion-otorgacion-fundadores/${otorgacion_id}`)
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

export const createFundadorOtor = async (fundador) => {
    const response = await axios.post('/api/modificacion-otorgacion-fundador-store', fundador)
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

export const updateFundadorOtor = async (fundador) => {
    const response = await axios.put(`/api/modificacion-otorgacion-fundador-update/${fundador.id}`, fundador)
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

export const destroyFundadorOtor = async (fundador) => {
    const response = await axios.delete(`/api/modificacion-otorgacion-fundador-destroy/${fundador.id}`)
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