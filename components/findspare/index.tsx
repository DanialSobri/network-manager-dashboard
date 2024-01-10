import { Button, Input, Text, Dropdown, Container } from '@nextui-org/react';

import { Flex } from '../styles/flex';
import { TableWrapper } from './table';
import { AddUser } from './add-user';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Search from './search';
import { useTransition } from 'react';

export const FindSpare = () => {

   const [selected, setSelected] = useState("marvel");
   const [isPending, startTransition] = useTransition();
   const selectedValue = React.useMemo(
      () => Array.from(selected).join("").replaceAll("_", " "),
      [selected]
   );
   const router = useRouter();
   const { name } = router.query;
   const currentPathname = router.pathname;


   const onChangeGen = (value: string) => {
      // Perform actions with the changed value, such as updating state or making API calls
      console.log('Selected value changed:', value.toLowerCase());
      const params = new URLSearchParams(window.location.search);
      if (value) {
          params.set('gen', value);
      } else {
          params.delete('gen');
      }
      startTransition(() => {
         router.replace(`${currentPathname}?${params.toString()}`);
     });
    };

   return (
      <Flex
         css={{
            'mt': '$5',
            'px': '$6',
            '@sm': {
               mt: '$10',
               px: '$16',
            },
         }}
         justify={'center'}
         direction={'column'}
      >
         <Flex direction={'row'} css={{ gap: '$6' }} wrap={'wrap'} justify={'end'}>
            <Dropdown>
               <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                  {selectedValue}
               </Dropdown.Button>
               <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="secondary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selected}
                  onSelectionChange={setSelected as any}
                  onAction={onChangeGen as any}
               >
                  <Dropdown.Item key="Marvel">Marvel</Dropdown.Item>
                  <Dropdown.Item key="IBSE">IBSE</Dropdown.Item>
                  <Dropdown.Item key="NGT">NGT</Dropdown.Item>
               </Dropdown.Menu>
            </Dropdown>
         </Flex>
         <Text h3>Find Spares</Text>
         <Flex
            css={{ gap: '$8' }}
            align={'center'}
            justify={'between'}
            wrap={'wrap'}
         >
            <Flex
               css={{
                  'gap': '$6',
                  'flexWrap': 'wrap',
                  '@sm': { flexWrap: 'nowrap' },
               }}
               align={'center'}
            >
               <Search />
               {(!name) ? (
                  <div>
                     <Button auto>
                        Filter
                     </Button>
                  </div>) : (
                  <Button auto>
                     Clear Filter
                  </Button>)
               }

               {/* <TrashIcon />
               <InfoIcon />
               <DotsIcon /> */}
            </Flex>

         </Flex>

         <TableWrapper />
         <Flex direction={'row'} css={{ gap: '$6' }} wrap={'wrap'} justify={'end'}>
            {/* <AddUser /> */}
            {/* <Button auto iconRight={<ExportIcon />}>
                  Checkout
               </Button> */}
         </Flex>
      </Flex>
   );
};
