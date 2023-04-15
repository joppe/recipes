import { Layout } from '../../components/crud/Layout';
import { StateProvider } from '../../components/crud/context/StateContext';
import { Create } from '../../components/unit/Create';
import { List } from '../../components/unit/List';
import { Remove } from '../../components/unit/Remove';
import { UnitHeader } from '../../components/unit/UnitHeader';
import { Update } from '../../components/unit/Update';

export default function UnitCRUD(): JSX.Element {
  return (
    <StateProvider>
      <Layout>
        <UnitHeader />
        <List />
        <Remove />
        <Create />
        <Update />
      </Layout>
    </StateProvider>
  );
}
