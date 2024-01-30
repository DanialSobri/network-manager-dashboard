import React, { useState, useEffect } from 'react';
import { SpareResult } from '../components/findspare/SpareResult';
import { SpareFilter } from '../components/findspare/SpareFilter';
import { Container, Spacer, Text } from "@nextui-org/react";
import { SelectDomain } from '../components/findspare/SelectDomain';
import { useRouter } from 'next/router';


const FindSpare = () => {
   const router = useRouter();
   const { name, gen, loc } = router.query;
   
   const [spares, setSpares] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(process.env.PROXY_PATH+'/api/spare/filter?' + ((name) ? '&name=' + name : "")  + ((gen) ? '&gen=' + gen : "") + ((loc) ? '&loc=' + loc : ""));
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setSpares(data.spares);
         } catch (error) {
            setError(error as any);
         } finally {
            setLoading(false);
         }
      };

      if (name || loc) {
         fetchData();
      }
      else {
         setSpares([]); // Initialize spares as an empty array
      }
   }, [name, gen, loc]);

   return (
      <Container>
         <SelectDomain />
         <Text h3>Find Spares</Text>
         <SpareFilter />
         <SpareResult data={spares} setData={setSpares as any} />
      </Container>
   );
};

export default FindSpare;
