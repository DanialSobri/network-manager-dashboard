import { Badge, Avatar, Table, Row, Button, Divider, Input, Modal, Text, Col } from '@nextui-org/react';
import React from 'react';
import { Flex } from '../styles/flex';
import { CartIcon } from '../icons/findspare/cart-icon';

let data = [{
    id: "TETS",
    Region: "TETS",
    Router: "TETS",
    Slot: "TETS",
    Port: "TETS",
    Item: "TETS",
    SubItem: "TETS",
    PN: "TETS",
    Rev: "TETS",
    SN: "TETS",
    Description: "TETS",
    ModelNumber: "TETS",
    Status: "TETS",
}]
export const SpareCart = () => {
    const max_item = 5;
    const [visible, setVisible] = React.useState(false);
    const openModal = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
        console.log('closed');
    };

    return (
        <div>
            <Badge color="error" content={0}>
                <Button
                    auto
                    color="secondary"
                    onClick={openModal}
                >
                    Cart
                </Button>
            </Badge>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                width="600px"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header css={{ justifyContent: 'start' }}>
                    <Text id="modal-title" h4>
                        Checkout
                    </Text>
                </Modal.Header>
                <Divider css={{ my: '$5' }} />
                <Modal.Body css={{ py: '$10' }}>
                    <Flex
                        direction={'column'}
                        css={{
                            'flexWrap': 'wrap',
                            'gap': '$8',
                            '@lg': { flexWrap: 'nowrap', gap: '$12' },
                        }}
                    >
                        <Table
                            shadow={false}
                            aria-label="Example table with dynamic content"
                            css={{
                                height: "auto",
                                minWidth: "100%",
                            }}
                        >
                            <Table.Header>
                                <Table.Column>Spare</Table.Column>
                                <Table.Column>Location</Table.Column>
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
                                            <Button auto rounded color={"error"}flat size={"sm"} onPress={() => console.log("rm" + item.id)}>
                                                Remove
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
                    </Flex>
                </Modal.Body>
                <Divider css={{ my: '$5' }} />
                <Modal.Footer>
                    <Button auto onClick={closeHandler}>
                        Check out
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
