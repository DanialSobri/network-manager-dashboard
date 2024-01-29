import { useEffect, useState } from 'react';
import { jwtDecode, JwtPayload as DecodedJwtPayload } from 'jwt-decode';
import { useRouter } from 'next/router';

interface JwtPayload {
  // Define your JWT payload interface here
  userId: string;
  username: string;
  role: string;
}

const useAuth = (): JwtPayload | null => {
  const [decodedToken, setDecodedToken] = useState<JwtPayload | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        const jwtPayload: JwtPayload = {
          userId: decoded.userId,
          username: decoded.username,
          role: decoded.role
        };
        setDecodedToken(jwtPayload);
        console.log(decoded, jwtPayload)
      } catch (error) {
        console.log('Error decoding token:', error);
        // You might want to handle this error more gracefully, e.g., redirect to login page
        setDecodedToken(null);
      }
    } else {
      console.log('Token not found in localStorage');
      // You might want to handle this case based on your application requirements
      setDecodedToken(null);
      router.push("/login");
    }
  }, []);

  return decodedToken;
};

export default useAuth;
