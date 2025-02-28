import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useLogin = (loginSubmit) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password,
        };

        try {
            await loginSubmit(loginData);
            toast.success('Login Successful');
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Login failed');
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        submitForm,
    };
};

export default useLogin;