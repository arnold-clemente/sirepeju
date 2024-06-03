import { token_expired, permission_denied } from "components/AxiosError"

export const getReferencia = async () => {
    const response = await axios.get('/api/panel/referencia')
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


export const updateReferencia = async (referencia) => {
    const response = await axios.post(`/api/panel/referencia/update`, referencia)
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


