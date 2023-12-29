import { token_expired, permission_denied } from "../components/AxiosError"

export const login = async (user) => {
    const csrf = async () => { await axios.get('/sanctum/csrf-cookie'); }
    const response = await axios.post('/api/auth/login', user)
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

export const logout = async (user) => {
    const response = await axios.post('/api/auth/logout', user)
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

export const getUser = async (user) => {
    const response = await axios.post('/api/auth/user', user)
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

export const updateProfile = async (user) => {
    const res = await axios.post('/api/auth/update', user)
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