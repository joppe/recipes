import { ProductLoader } from './ProductLoader';

import { Button, Form } from '../../form';
import { FormData } from '../../form/types/FormData';
import { Autocomplete } from '../Autocomplete';

export default {
  title: 'Component/Autocomplete',
  component: Autocomplete,
};

const productLoader = new ProductLoader();

const Template = () => (
  <Form
    submitHandler={(data: FormData) => {
      console.log(data);
    }}
  >
    <Autocomplete name="recipe" dataLoader={productLoader} />

    <div className="flex justify-end py-2.5">
      <Button type="submit">Save</Button>
    </div>
  </Form>
);

export const Default = Template.bind({});
