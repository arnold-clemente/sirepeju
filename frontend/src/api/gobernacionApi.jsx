
import { token_expired, permission_denied } from "../components/AxiosError"

export const getGobernacions = async () => {
    const response = await axios.get('/api/gobernacions')
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

export const getGobernacion = async (gobernacionId) => {
    const response = await axios.get(`/api/gobernacion/show/${gobernacionId}`)
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

export const createGobernacion = async (gobernacion) => {
    const response = await axios.post('/api/gobernacion/store', gobernacion)
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

export const updateGobernacion = async (gobernacion) => {
    const response = await axios.put(`/api/gobernacion/update/${gobernacion.id}`, gobernacion)
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

export const destroyGobernacion = async (gobernacion) => {
    const response = await axios.delete(`/api/gobernacion/destroy/${gobernacion.id}`)
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

export const passwordGobernacion = async (gobernacion) => {
    const response = await axios.post(`/api/gobernacion/password`, gobernacion)
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
