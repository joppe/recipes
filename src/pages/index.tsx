import * as React from 'react';
import { Link } from 'gatsby';

import { Header } from '../components/Header';
import { Layout } from '../components/Layout';

export default function(): JSX.Element {
    return (
        <Layout>
            <Header headerText="Lorem Ipsum" />
            <div style={{ color: `purple`, fontSize: `72px` }}>
                Hello Gatsby!
            </div>
            <Link to="/about/">about?</Link>
        </Layout>
    );
}
