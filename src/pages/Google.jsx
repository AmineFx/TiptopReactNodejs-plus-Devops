import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { apiGlobal } from '../apiGlobal';
import { message } from 'antd';
import Cookies from 'js-cookie';

const Google = () => {

    const navigate = useNavigate();
    
    const handleSuccess = async (credentialResponse) => {
        try {
            const response = await apiGlobal.post(`auth/google`, {token: credentialResponse.credential});
            if (response.status === 200) {
                Cookies.set("accessToken", response?.data?.accessToken);
                Cookies.set("userInfo", JSON.stringify(response?.data?.info));
                navigate(0);
            }
        } catch (error) {
            console.error('Error sending token to backend:', error);
        }
    };

    return (
        <GoogleOAuthProvider clientId="742353172789-l7crj2ankuns2ik3ni4954jf237dfesj.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                    console.log('Login Failed');
                    message.error('Erruer de connexion avec Google');
                }}
                useOneTap
            />
        </GoogleOAuthProvider>
    );
}

export default Google;
