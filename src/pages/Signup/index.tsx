import React from 'react';
import { ImagemBanner } from '../../components/BannerImage/ImagemBanner';
import { Form } from '../../components/Form';
import { WrapperContent } from '../../components/WrapperContent';

function Signup() {
    return (
        <WrapperContent>
            <ImagemBanner />
            <Form mode='signup' />
        </WrapperContent>
    )
}

export { Signup }