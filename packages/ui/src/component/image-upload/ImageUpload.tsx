import { ChangeEvent, RefObject, useRef, useState } from 'react';
import { CgClose } from 'react-icons/cg';

import { gql, useApolloClient } from '@apollo/client';

import { Validator } from '../form';
import { useField } from '../form/context/useField';

export type ImageUploadProps = {
  id: string;
  name: string;
  value?: string;
  validators?: Validator[];
};

const mutation = gql`
  mutation createUploadUrl($fileName: String!, $contentType: String!) {
    createUploadUrl(fileName: $fileName, contentType: $contentType) {
      url
      fileName
    }
  }
`;

export const ImageUpload = ({
  id,
  name,
  value: defaultValue = '',
  validators = [],
}: ImageUploadProps) => {
  const client = useApolloClient();
  const input = useRef<HTMLInputElement>(null);
  const ref = useField(name, validators);
  const [preview, setPreview] = useState(defaultValue);
  const [value, setValue] = useState(defaultValue);

  const removeImage = () => {
    (input.current as HTMLInputElement).value = '';

    setValue('');
    setPreview('');
  };

  const onLocalImageLoad = async (file: File) => {
    const { data } = await client.mutate({
      mutation,
      variables: {
        fileName: file.name,
        contentType: file.type,
      },
    });

    await fetch(data.createUploadUrl.url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    setValue(data.createUploadUrl.fileName);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files === null || files.length === 0) {
      return setPreview('');
    }

    const reader = new FileReader();

    reader.onload = () => {
      onLocalImageLoad(files[0]);
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(files[0]);
  };

  return (
    <div className="flex flex-row">
      <input
        type="hidden"
        name={name}
        value={value}
        ref={ref as RefObject<HTMLInputElement>}
      />
      {preview !== '' && (
        <div className="relative">
          <button
            type="button"
            className="absolute z-10 right-2 top-2 p-2 text-white bg-black rounded-sm"
            aria-label="Remove image"
            onClick={removeImage}
          >
            <CgClose />
          </button>
          <img
            src={preview}
            alt="Image preview"
            className="p-1 bg-white border rounded w-40 h-40 object-cover"
          />
        </div>
      )}
      <div>
        <input
          ref={input}
          id={id}
          type="file"
          onChange={handleChange}
          accept="image/png, image/jpeg"
          className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        />
      </div>
    </div>
  );
};
