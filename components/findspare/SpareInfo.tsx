import { Button, Divider, Modal, Text } from '@nextui-org/react';
import React from 'react';
import { Flex } from '../styles/flex';

interface SpareData {
   id: string;
   Region: string;
   Router: string;
   Slot: string;
   Port: string;
   Item: string;
   SubItem: string;
   PN: string;
   Rev: string;
   SN: string;
   Description: string;
   ModelNumber: string;
   Status: string;
}

interface SpareInfoProps {
    item: SpareData; // Define the type for the selected item
    onClose: () => void; // Define the callback function for closing the modal
    onUpdate: (updatedItem: SpareData) => void; // Define the callback function for updating the data
}

export const SpareInfo: React.FC<SpareInfoProps> = ({ item, onClose, onUpdate }) => {
    const [visible, setVisible] = React.useState(true);

    const closeHandler = () => {
        console.log("Cancel");
        setVisible(false);
        onClose(); // Call the onClose callback function provided by the parent component
    };

    const useSpareHandler = async () => {
        console.log("Use Spare "+item.id);
        // Assuming here you have updated the item
        const updatedItem = { ...item, Status: 'Faulty' }; // Modify the status as needed
        onUpdate(updatedItem); // Call the onUpdate callback function provided by the parent component
        setVisible(false);
        onClose(); // Call the onClose callback function provided by the parent component\
        
        const apiUrl = process.env.PROXY_PATH+"/api/spare/use";
        const payload = [
            { "id": item.id, "Status": "Faulty" },
        ];

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log("Spare used successfully!");
            } else {
                console.error("Failed to use spare:", response.status);
            }
        } catch (error) {
            console.error("Error occurred while using spare:", error);
        }
    };

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            width="600px"
            open={visible}
            onClose={closeHandler}
        >
            <Modal.Header css={{ justifyContent: 'start' }}>
                <Text id="modal-title" h4>
                    Spares Information {/* Display the ModelNumber of the selected item */}
                </Text>
            </Modal.Header>
            <Divider css={{ my: '$5' }} />
            <Modal.Body css={{ py: '$10' }}>
                <Flex
                    direction={'column'}
                    css={{
                        'flexWrap': 'wrap',
                        'gap': '$0',
                        '@lg': { flexWrap: 'nowrap', gap: '$0' },
                    }}
                >
                    {/* Display other details of the selected item */}
                    <Text>Id: {item.id}</Text>
                    <Text>Spare: {item.ModelNumber}</Text>
                    <Text>Description: {item.Description}</Text>
                    <Text>Location: {item.Region} {item.Router} {item.Slot} {item.Port} {item.Item} {item.SubItem}</Text>
                    <Text>PN: {item.PN}</Text>
                    <Text>Rev: {item.Rev}</Text>
                    <Text>Serial Number: {item.SN}</Text>
                    <Text>Status: {item.Status}</Text>
                </Flex>
            </Modal.Body>
            <Divider css={{ my: '$5' }} />
            <Modal.Footer>
                <Button auto onPress={useSpareHandler}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
