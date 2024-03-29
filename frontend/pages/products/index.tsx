import { Layout } from '../../components/crud/Layout';
import { StateProvider } from '../../components/crud/context/StateContext';
import { Create } from '../../components/product/Create';
import { List } from '../../components/product/List';
import { ProductHeader } from '../../components/product/ProductHeader';
import { Remove } from '../../components/product/Remove';
import { Update } from '../../components/product/Update';

export default function UnitCRUD(): JSX.Element {
  return (
    <StateProvider>
      <Layout>
        <ProductHeader />
        <List />
        <Remove />
        <Create />
        <Update />
      </Layout>
    </StateProvider>
  );
}
