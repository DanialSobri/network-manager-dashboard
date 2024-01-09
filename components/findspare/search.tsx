'use client';

import { useRouter } from 'next/router';
import { useTransition } from 'react';
import { Input } from '@nextui-org/react';

export default function Search({ disabled }: { disabled?: boolean }) {
    const router = useRouter();
    const currentPathname = router.pathname;
    const [isPending, startTransition] = useTransition();

    function handleSearch(term: string) {
        const params = new URLSearchParams(window.location.search);
        if (term) {
            params.set('name', term);
        } else {
            params.delete('name');
        }

        startTransition(() => {
            router.replace(`${currentPathname}?${params.toString()}`);
        });
    }

    return (
        <Input
            css={{ width: '100%', maxW: '410px' }}
            placeholder="Search spares"
            onChange={(e) => handleSearch(e.target.value)}
        />

    );
}