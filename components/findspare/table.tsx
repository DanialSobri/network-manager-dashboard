import { Table } from '@nextui-org/react';
import { Box } from '../styles/box';
import { RenderCell } from './render-cell';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const TableWrapper = () => {
   const [spares, setSpares] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const router = useRouter();
   const { name,gen } = router.query;

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch('/api/spare/filter?name=' + name+'&gen='+gen);
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setSpares(data.spares);
         } catch (error) {
            setError(error as any);
         } finally {
            setLoading(false);
         }
      };

      if (name) {
         fetchData();
      }
   }, [name]);

   const columns = [
      { name: 'SPARE', uid: 'spare' },
      { name: 'LOCATION', uid: 'location' },
      { name: 'STATUS', uid: 'status' },
      { name: 'ACTIONS', uid: 'actions' },
   ];

   // Conditionally render loading state
   if (!name) return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
         <div>Start searching.</div>
      </div>
   );
   if (loading) return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
         <div>Loading...</div>
      </div>
   );
   if (!(spares.length > 0)) return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
         <div>spare not found.</div>
      </div>
   );
   if (error)  return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
         <div>Error loading data</div>
      </div>
   );


   return (
      <Box
         css={{
            '& .nextui-table-container': {
               boxShadow: 'none',
            },
         }}
      >
         <Table
            aria-label="Example table with custom cells"
            css={{
               height: 'auto',
               minWidth: '100%',
               boxShadow: 'none',
               width: '100%',
               px: 0,
            }}
            selectionMode="multiple"
         >
            <Table.Header columns={columns}>
               {(column) => (
                  <Table.Column
                     key={column.uid}
                     hideHeader={column.uid === 'actions'}
                     align={column.uid === 'actions' ? 'center' : 'start'}
                  >
                     {column.name}
                  </Table.Column>
               )}
            </Table.Header>
            <Table.Body items={spares}>
               {(item) => (
                  <Table.Row key={item.pid as any}>
                     {(columnKey) => (
                        <Table.Cell>
                           {RenderCell({ spare: item, columnKey: columnKey })}
                        </Table.Cell>
                     )}
                  </Table.Row>
               )}
            </Table.Body>
            <Table.Pagination
               shadow
               noMargin
               align="center"
               rowsPerPage={8}
               onPageChange={(page) => {
                  console.log({ page });
               }}
            />

         </Table>
      </Box>
   );
};
