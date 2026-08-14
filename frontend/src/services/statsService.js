import api from "../api/axios";

export const getStats = async () => {
    return await api.get("/stats");
};