import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagemBanner } from '../../components/BannerImage/ImagemBanner';
import { Form } from '../../components/Form';
import { WrapperContent } from '../../components/WrapperContent';
import { useAppSelector } from '../../store/hooks';

function Login() {
    const navigate = useNavigate();
    const userLogged = useAppSelector((state) => state.userLogged)

    useEffect(
        () => {

            if (userLogged.email) {
                navigate('/home')
            }

            return () => {
                console.log('DESMONTOU login')
            }
        },


        [navigate, userLogged]
    )
    return (
        <WrapperContent>
            <ImagemBanner/>
            <>
            <Form mode='login' />
            </>
        </WrapperContent>
    )
}

export { Login }