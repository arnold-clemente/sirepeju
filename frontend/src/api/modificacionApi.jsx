import { token_expired, permission_denied } from "../components/AxiosError"

export const getModificaciones = async () => {
    const response = await axios.get('/api/modificaciones')
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

export const getOtorgacionMod = async (otorgacion) => {
    const response = await axios.post('/api/modificacion-show-otorgacion', otorgacion)
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

export const getAdecuacionMod = async (adecuacion) => {
    const response = await axios.post('/api/modificacion-show-adecuacion', adecuacion)
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
