'use client';

import { useEffect, useRef, useState } from 'react';

import { getProducts } from '@/actions/products';
import { ActionMenu } from '@/components/layout/action-menu';
import {
  AddButton,
  ButtonBar,
  ButtonGroup,
} from '@/components/layout/button-bar';
import {
  Heading,
  HeadingDescription,
  HeadingTitle,
} from '@/components/layout/heading';
import { Loading } from '@/components/layout/loading/Loading';
import { DataStats, DataView, Section } from '@/components/layout/section';
import { Create, Delete, Edit } from '@/components/products';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product } from '@/db/schema';

enum DisplayMode {
  List = 'list',
  Add = 'add',
  Delete = 'delete',
  Edit = 'edit',
}

export default function Products() {
  const selected = useRef<Product | null>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.List);
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts();

      setProducts(products);
    }

    selected.current = null;

    if (displayMode === DisplayMode.List) {
      void fetchProducts();
    }
  }, [displayMode]);

  return (
    <>
      {displayMode === DisplayMode.Add && (
        <Create onFinish={() => setDisplayMode(DisplayMode.List)} />
      )}
      {displayMode === DisplayMode.Edit && selected.current && (
        <Edit
          product={selected.current}
          onFinish={() => setDisplayMode(DisplayMode.List)}
        />
      )}
      {displayMode === DisplayMode.Delete && selected.current !== null && (
        <Delete
          product={selected.current}
          onFinish={() => setDisplayMode(DisplayMode.List)}
        />
      )}

      <ButtonBar>
        <ButtonGroup pullRight>
          <AddButton
            text="Add Product"
            onClick={() => setDisplayMode(DisplayMode.Add)}
          />
        </ButtonGroup>
      </ButtonBar>

      <Section>
        <Heading>
          <HeadingTitle>Products</HeadingTitle>
          <HeadingDescription>
            Products are used to indicate the quantity of a product.
          </HeadingDescription>
        </Heading>

        <DataView>
          {products === undefined && <Loading />}
          {products !== undefined && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>
                        <ActionMenu
                          handleEdit={() => {
                            selected.current = product;
                            setDisplayMode(DisplayMode.Edit);
                          }}
                          handleDelete={() => {
                            selected.current = product;
                            setDisplayMode(DisplayMode.Delete);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </DataView>
        {products !== undefined && (
          <DataStats>
            <strong>{products.length}</strong> products
          </DataStats>
        )}
      </Section>
    </>
  );
}
