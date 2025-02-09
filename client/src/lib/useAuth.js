import { useState, useEffect } from 'react';
import { axiosInstance } from './axios';

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState();
    const checkauth = async () => {
          const res = await axiosInstance.get(
            `/auth/checkAuth`
        );
        if (res.status == 200) setAuthenticated(true);
        else setAuthenticated(false);
    }
    useEffect(() => {
        checkauth();
    }, [])
    
    return { authenticated };
}

export default useAuth;