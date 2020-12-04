import React from 'react';

import { ImageForm } from '../../component/form/image-form';
import { BASE_URL } from '../../config/api';

export default function CreateImage(): JSX.Element {
    return (
        <ImageForm
            path={`${BASE_URL}/api/images/create`}
            returnPath="/images"
            method="POST"
            title="Afbeelding aanmaken"
        />
    );
}
