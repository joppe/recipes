import { Autocomplete } from '../Autocomplete';
import { ProductLoader } from './ProductLoader';

export default {
  title: 'Component/Autocomplete',
  component: Autocomplete,
};

const productLoader = new ProductLoader();

const Template = () => <Autocomplete dataLoader={productLoader} />;

export const Default = Template.bind({});
