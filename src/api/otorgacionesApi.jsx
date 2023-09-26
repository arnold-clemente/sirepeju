export const getOtorgaciones = async () => {
    const response = await axios.get('/api/otorgaciones')
    return response.data;
}