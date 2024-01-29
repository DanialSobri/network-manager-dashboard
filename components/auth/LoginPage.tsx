import { Input, Button, Card, Row, Text } from "@nextui-org/react";
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSignIn = async () => {
        try {
            const response = await fetch(process.env.PROXY_PATH+'/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                // Store the token in localStorage
                localStorage.setItem('token', token);
                // Redirect to the desired page
                console.log("Debug:"+localStorage.getItem('token'));
                router.push(process.env.PROXY_PATH+"/findspare");

            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setError("An error occurred while signing in");
        }
    };

    return (
        <Row gap={1} justify="center" align="center" css={{height:"100%", marginTop:"$20"}}>
            <Card css={{ p: "$6", mw: "400px" }}>
                <Card.Header>
                    <Text h4 css={{ lineHeight: "$xs" }}>
                        Login
                    </Text>
                </Card.Header>
                <Card.Body css={{ py: "$10" }}>
                    <Input
                        clearable
                        label="Username"
                        placeholder="Enter your username"
                        css={{ marginBottom: "$5" }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        clearable
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        css={{ marginBottom: "$5" }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Text color="error">{error}</Text>}
                </Card.Body>
                <Card.Footer>
                    <Row justify="flex-end" css={{ marginBottom: "$5" }}>
                        <Button onClick={handleSignIn}>Sign In</Button>
                    </Row>
                </Card.Footer>
            </Card>
        </Row>
    );
};
