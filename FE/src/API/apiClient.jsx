import axiosClient from "./axiosClient"

const apiClient = {
    get: async (apiLink) => {
        try{
            const res = await axiosClient.get(apiLink)
            return res.data
        } catch(error){
            console.log('API GET ERROR', error);
            throw error
        }
    },
    post: async (apiLink, data) => {
        try{
            const res = await axiosClient.post(apiLink, data)
            return res.data
        } catch(error){
            console.log('API POST ERROR', error);
            throw error
        }
    },
    put: async (apiLink, data) => {
        try{
            const res = await axiosClient.put(apiLink, data)
            return res.data
        } catch(error){
            console.log('API PUT ERROR', error);
            throw error
        }
    },
    patch: async (apiLink, data) => {
        try{
            const res = await axiosClient.patch(apiLink, data)
            return res.data
        } catch(error){
            console.log('API PATCH ERROR', error);
            throw error
        }
    },
    delete: async (apiLink, data) => {
        try{
            const res = await axiosClient.delete(apiLink, data)
            return res.data
        } catch(error){
            console.log('API DELETE ERROR', error);
            throw error
        }
    },
}

export default apiClient