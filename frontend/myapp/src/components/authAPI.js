import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const Posts = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [posts, setPosts] = useState(null);
  
    useEffect(() => {
      (async () => {
        try {
          const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_APIAUDIENCE,
          });
          const response = await fetch(process.env.REACT_APP_APIAUDIENCE+'/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },'Access-Control-Request-Method': 'GET',
            'Access-Control-Request-Headers': "Content-Type, Accept",
            method: 'GET',
          });
          setPosts(await response.json());
          console.log(response)
        } catch (e) {
          console.error(e);
        }
      })();
    }, [getAccessTokenSilently])
    return (
        <div>
            {posts}
        </div>
    )
};



