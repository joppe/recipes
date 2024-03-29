import { useMutation } from '@apollo/client';

import {
  Fieldset,
  FormField,
  Input,
  Label,
  Legend,
} from '@recipes/ui/component/form';
import { ImageUpload } from '@recipes/ui/component/image-upload';
import { UploadResult, Uploader } from '@recipes/ui/types';

import { Media } from '../../gql/graphql';

import { createUploadUrlMutation } from './gql/createUploadUrl.mutation';

export type LinkedMediaProps = {
  media?: Media;
};

export function LinkedMedia({ media }: LinkedMediaProps): JSX.Element {
  const [createUrl] = useMutation(createUploadUrlMutation);
  const uploader: Uploader = async (file: File): Promise<UploadResult> => {
    const result = await createUrl({
      variables: {
        filename: file.name,
        contentType: file.type,
      },
    });
    const { url, filename } = result.data?.createUploadUrl ?? {};

    if (!url || !filename) {
      return {
        filename: null,
        error: 'Could not create upload URL',
      };
    }

    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    return {
      filename,
      error: null,
    };
  };

  return (
    <Fieldset>
      <Legend>Linked Media</Legend>
      <Input type="hidden" name="media.type" id="type" value="image" />
      <FormField
        label={<Label id="media">Media</Label>}
        input={
          <ImageUpload
            id="media"
            name="media.url"
            value={media?.url ?? ''}
            uploader={uploader}
          />
        }
      />
      <FormField
        label={<Label id="title">Title</Label>}
        input={
          <Input
            id="title"
            name="media.title"
            type="text"
            value={media?.title ?? ''}
          />
        }
      />
    </Fieldset>
  );
}
