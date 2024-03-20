import type {NextPage} from 'next';
import Content from '../components/home/content';
import { Suspense, useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from '../components/hooks/useAuth';
import Loading from '../components/layout/Loading';

const Home: NextPage = () => {

   const [loading, setLoading] = useState(true)
   const router = useRouter()
 
   // Check if user is authenticated
   const user = useAuth()
 
   // Redirect to login page if not authenticated
   useEffect(() => {
     if (!user?.username) {
       router.push(process.env.PROXY_PATH+'/login')
     } else {
       setLoading(false)
     }
   }, [])
 
   // Show loading component while checking
   if (loading) {
     return <Loading />
   }
 
   // Render page content if authenticated
   return <div>Welcome, {user?.username}</div>
};

export default Home;
