import { Button, Input, Text } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { Breadcrumbs, Crumb, CrumbLink } from '../breadcrumb/breadcrumb.styled';
import { DotsIcon } from '../icons/accounts/dots-icon';
import { ExportIcon } from '../icons/accounts/export-icon';
import { InfoIcon } from '../icons/accounts/info-icon';
import { TrashIcon } from '../icons/accounts/trash-icon';
import { HouseIcon } from '../icons/breadcrumb/house-icon';
import { UsersIcon } from '../icons/breadcrumb/users-icon';
import { SettingsIcon } from '../icons/sidebar/settings-icon';
import { Flex } from '../styles/flex';
import { TableWrapper } from './table';
import { AddUser } from './add-user';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Search from './search';

export const FindSpare = () => {

   const [selected, setSelected] = useState("Marvel");
   const selectedValue = React.useMemo(
      () => Array.from(selected).join("").replaceAll("_", " "),
      [selected]
   );
   const router = useRouter();
   const { name } = router.query;

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
      </Flex>
   );
};
