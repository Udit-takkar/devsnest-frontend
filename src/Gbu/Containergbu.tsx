import React, { useEffect, useState } from 'react';
import Componentgbu from './Componentgbu';
import axios from '../config/axios.config';
type State = {
  description: string;
};
const Containergbu = () => {
  const [gbu, setGbu] = useState([]);
  const [userGbu, setUserGbu] = useState({
    description: '',
  });
  const [status, setStatus] = useState(false);
  const token: string = localStorage.getItem('Token') || '';
  const fetchDetails = async () => {
    if (token !== '') {
      const res = await axios.get('/api/users/allGbu', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res;

      setGbu(data.data);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [userGbu]);
  const fetchStatus = async () => {
    if (token !== '') {
      const res = await axios.get('/api/users/gbuStatus', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res;
      if (data.data) setStatus(data.data.isGbuPending);
    }
  };
  useEffect(() => {
    fetchStatus();
  }, [userGbu]);
  useEffect(() => {
    fetchStatus();
  }, []);
  const addGbu = (item: any) => {
    let value = '';
    const newgbu = {
      description: item,
    };
    setUserGbu(newgbu);
  };

  const handlePost = () => {
    axios
      .post('api/users/gbu', userGbu, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {})
      .catch((error) => {});
  };
  useEffect(() => {
    handlePost();
  }, [userGbu]);
  return (
    <div>
      <Componentgbu gbu={gbu} addGbu={addGbu} status={status} />
    </div>
  );
};

export default Containergbu;
