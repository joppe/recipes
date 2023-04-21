import { Story } from '@storybook/react';

import { Uploader } from '../../../types';
import { Button, Form, FormField, Label, Notification } from '../../form';
import { FormData } from '../../form/types';
import { ImageUpload } from '../ImageUpload';

export default {
  title: 'Component/ImageUpload',
  component: ImageUpload,
};

type TemplateProps = {
  uploader: Uploader;
};

function Template({ uploader }: TemplateProps): JSX.Element {
  return (
    <Form
      submitHandler={(data: FormData): void => {
        console.log('Submitted data', data);
      }}
    >
      <FormField
        label={<Label id="image">Image</Label>}
        input={
          <ImageUpload
            uploader={uploader}
            name="image"
            id="image"
            value="https://placekitten.com/400/400"
          />
        }
      />

      <Notification />

      <div className="flex justify-end py-2.5">
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
}

export const Default: Story<TemplateProps> = Template.bind({});
Default.args = {
  uploader: async (file: File): Promise<{ error: null; filename: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ filename: file.name, error: null });
      }, 300);
    });
  },
};

export const Error: Story<TemplateProps> = Template.bind({});
Error.args = {
  uploader: async (file: File): Promise<{ error: string; filename: null }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ filename: null, error: 'Something went wrong' });
      }, 300);
    });
  },
};
