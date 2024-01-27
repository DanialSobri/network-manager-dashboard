import { Button, Table, Row, Text, Col } from "@nextui-org/react";
import { StyledBadge } from './table.styled';
import { SpareInfo } from "./SpareInfo";
import React, { useState } from 'react';

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

export const SpareResult = ({ data }: { data: SpareData[] }) => {
    const max_item = 5

    // State to control modal visibility and selected item data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SpareData | null>(null);

    // Function to handle opening the modal and setting the selected item
    const openModal = (item: SpareData) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    // Function to handle closing the modal
    const closeModal = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            <Table
                aria-label="Example table with dynamic content"
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}
            >
                <Table.Header>
                    <Table.Column>Spare</Table.Column>
                    <Table.Column>Location</Table.Column>
                    <Table.Column>Status</Table.Column>
                    <Table.Column>Action</Table.Column>
                </Table.Header>
                <Table.Body items={data}>
                    {(item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>
                                <Col>
                                    <Row>
                                        <Text b size={14}>
                                            {item.Description}
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Text
                                            b
                                            size={13}
                                            css={{ color: '$accents7' }}
                                        >
                                            {item.ModelNumber}
                                        </Text>
                                    </Row>
                                </Col>
                            </Table.Cell>
                            <Table.Cell>
                                <Col>
                                    <Row>
                                        <Text b size={14}>
                                            {item.Router}
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Text
                                            b
                                            size={13}
                                            css={{ color: '$accents7' }}
                                        >
                                            {item.Slot} {item.Port} {item.Item} {item.SubItem}
                                        </Text>
                                    </Row>
                                </Col>
                            </Table.Cell>
                            <Table.Cell>
                                <StyledBadge type={String(item.Status).toLowerCase() as any}>{item.Status}</StyledBadge>
                            </Table.Cell>
                            <Table.Cell>
                                <Button auto rounded flat size={"sm"} onPress={() => openModal(item)}>
                                    Select
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    )}

                </Table.Body>
                <Table.Pagination
                    shadow
                    noMargin
                    total={Math.ceil(data.length / max_item)}
                    align="center"
                    rowsPerPage={max_item}
                    onPageChange={(page) => console.log({ page })}
                />
            </Table>
            {isModalOpen && selectedItem && (
                <SpareInfo item={selectedItem} onClose={closeModal} />
            )}</div>
    );
}