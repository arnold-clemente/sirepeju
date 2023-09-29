export const createFundadores = async (fundadores) => {
    const res = await axios.post('/api/fundadores/store', fundadores)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}