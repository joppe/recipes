import { ChangeEvent, RefObject, useRef, useState } from 'react';
import { CgClose } from 'react-icons/cg';

import { Uploader } from '../../types';
import { Validator } from '../form';
import { useField } from '../form/context/useField';

export type ImageUploadProps = {
  id: string;
  name: string;
  value?: string;
  validators?: Validator[];
  uploader: Uploader;
};

export function ImageUpload({
  id,
  name,
  value: defaultValue = '',
  validators = [],
  uploader,
}: ImageUploadProps): JSX.Element {
  const input = useRef<HTMLInputElement>(null);
  const ref = useField(name, validators);
  const [preview, setPreview] = useState<string>(defaultValue);
  const [value, setValue] = useState<string>(defaultValue);

  const removeImage = (): void => {
    (input.current as HTMLInputElement).value = '';

    setValue('');
    setPreview('');
  };

  const onLocalImageLoad = async (file: File): Promise<void> => {
    const fileName = await uploader(file);

    setValue(fileName);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
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
}
