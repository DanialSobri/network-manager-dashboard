import { Row, Col, Button, Input, Spacer } from "@nextui-org/react";
import { useRouter } from 'next/router';
import React, { useState, useTransition, useEffect } from 'react';

export const SpareFilter = () => {
    const router = useRouter();
    const prefix = process.env.PROXY_PATH || '';
    const currentPathname = router.pathname;
    const [isPending, startTransition] = useTransition();

    // State variables to store input field values
    const [spareName, setSpareName] = useState('');
    const [spareLocation, setSpareLocation] = useState('');

    useEffect(() => {
        // Retrieve query parameters from router.query
        const { name, loc } = router.query;
        // Set state variables with query parameter values
        setSpareName(name as string || '');
        setSpareLocation(loc as string || '');
    }, [router.query]);

    function handleSearch(term: string, value: string) {
        const params = new URLSearchParams(window.location.search);
        if (value) {
            params.set(term, value);
        } else {
            params.delete(term);
        }

        startTransition(() => {
            router.replace(`${currentPathname}?${params.toString()}`);
        });
    }

    function handleClear() {
        const params = new URLSearchParams(window.location.search);
        params.delete('name');
        params.delete('loc');

        startTransition(() => {
            router.replace(prefix+`${currentPathname}?${params.toString()}`);
        });
    }

    return (
        <Row align="center" justify="center" gap={0} css={{ marginTop: "$xl", marginBottom: "$10" }}>
            <Col css={{ marginRight: "$10" }}>
                <Input
                    fullWidth
                    labelPlaceholder="Spare Name"
                    value={spareName}
                    onChange={(e) => handleSearch('name', e.target.value)}
                />
            </Col>
            <Col css={{ marginRight: "$10" }}>
                <Input
                    fullWidth
                    labelPlaceholder="Spare Location"
                    value={spareLocation}
                    onChange={(e) => handleSearch('loc', e.target.value)}
                />
            </Col>
            <Col>
                <Button
                    auto
                    flat
                    rounded
                    color={"primary"}
                    onPress={handleClear}
                    size={"sm"}
                >
                    Clear Filter </Button>
            </Col>

        </Row>
    );
}