import { Dropdown, Container, Row, Text, Button } from "@nextui-org/react";
import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/router';
import { SpareCart } from "./SpareCart";

export const SelectDomain = () => {
    const [isPending, startTransition] = useTransition();
    const [selected, setSelected] = useState("marvel");
    const router = useRouter();
    const currentPathname = router.pathname;

    const onChangeGen = (value: string) => {
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
        <Row gap={1} justify="flex-end" css={{ marginTop: "$10" }}>
            < SpareCart/>
            <Dropdown>
                <Dropdown.Button flat color="secondary" css={{ textTransform: "capitalize",marginLeft: "$5"}}>
                    {selected}
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
                    <Dropdown.Item key="marvel">Marvel</Dropdown.Item>
                    <Dropdown.Item key="ibse">IBSE</Dropdown.Item>
                    <Dropdown.Item key="ngt">NGT</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Row>
    );
};
