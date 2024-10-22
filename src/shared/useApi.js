import axios from 'axios';
import { useMemo } from 'react';
import { useAuth } from '../AuthProvider';
import environment from '../environment';

export function useApi() {
    const { token } = useAuth();

    function createApi() {
        return axios.create({
            baseURL: environment.backendUrl,
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    const api = useMemo(createApi, [token]);

    return api;
}