import { useState, useEffect } from 'react';
import axios from 'axios';





const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, isLoading, error, username: userData?.username ,id:userData?.id};
};

export default useUserData;