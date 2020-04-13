import * as React from 'react';
import { graphql, Link } from 'gatsby';

import { Header } from '../components/Header';
import { Layout } from '../components/Layout';

export default function({ data }): JSX.Element {
    return (
        <Layout>
            <Header headerText={ data.site.siteMetadata.title } />
            <div style={{ color: `purple`, fontSize: `72px` }}>
                Hello Gatsby!
            </div>
            <Link to="/about/">about?</Link>
        </Layout>
    );
}

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
