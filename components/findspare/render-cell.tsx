import { Col, Row, Text, Tooltip } from '@nextui-org/react';
import React from 'react';
import { DeleteIcon } from '../icons/table/delete-icon';
import { EditIcon } from '../icons/table/edit-icon';
import { EyeIcon } from '../icons/table/eye-icon';
import { IconButton, StyledBadge } from './table.styled';

interface Spare {
   pid: string;
   router: string;
   slot: string;
   slotPort: string;
   item: string;
   subItem: string;
   pn: string;
   rev: string;
   sn: string;
   description: string;
   modelNumber: string;
   status: string;

}

interface Props {
   spare: Spare;
   columnKey: string | React.Key;
}

export const RenderCell = ({ spare, columnKey }: Props) => {
   //@ts-ignore
   const cellValue = spare[columnKey];
   switch (columnKey) {
      case 'spare':
         return (
            <Col>
               <Row>
                  <Text b size={14}>
                     {spare.description}
                  </Text>
               </Row>
               <Row>
                  <Text
                     b
                     size={13}
                     css={{ color: '$accents7' }}
                  >
                     {spare.modelNumber}
                  </Text>
               </Row>
            </Col>
         );
      case 'location':
         return (
            <Col>
               <Row>
                  <Text b size={14}>
                     {spare.router}
                  </Text>
               </Row>
               <Row>
                  <Text
                     b
                     size={13}
                     css={{ color: '$accents7' }}
                  >
                     {spare.slot} {spare.slotPort} {spare.item} {spare.subItem}
                  </Text>
               </Row>
            </Col>
         );
      case 'status':
         return (
            // @ts-ignore
            <StyledBadge type={String(spare.status).toLowerCase()}>{spare.status}</StyledBadge>
         );

      case 'actions':
         return (
            <Row
               justify="center"
               align="center"
               css={{ 'gap': '$8', '@md': { gap: 0 } }}
            >
               <Col css={{ d: 'flex' }}>
                  <Tooltip content="Details">
                     <IconButton
                        onClick={() => console.log('View spare', spare.pid)}
                     >
                        <EyeIcon size={20} fill="#979797" />
                     </IconButton>
                  </Tooltip>
               </Col>
               <Col css={{ d: 'flex' }}>
                  <Tooltip content="Edit spare">
                     <IconButton
                        onClick={() => console.log('Edit spare', spare.pid)}
                     >
                        <EditIcon size={20} fill="#979797" />
                     </IconButton>
                  </Tooltip>
               </Col>
               <Col css={{ d: 'flex' }}>
                  <Tooltip
                     content="Delete spare"
                     color="error"
                     onClick={() => console.log('Delete spare', spare.pid)}
                  >
                     <IconButton>
                        <DeleteIcon size={20} fill="#FF0080" />
                     </IconButton>
                  </Tooltip>
               </Col>
            </Row>
         );
      default:
         return cellValue;
   }
};
