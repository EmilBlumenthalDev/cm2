import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useSignup = (registerSubmit) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const registerData = {
            email,
            password,
        };

        try {
            await registerSubmit(registerData);
            toast.success('Registration Successful');
            navigate('/login');
        } catch (error) {
            toast.error(error.message || 'Registration failed');
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        submitForm,
    };
};

export default useSignup;