import { Card, Carousel, Spin, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const { Meta } = Card;
const { Title } = Typography;

const VoirCreateur = () => {
  const { id } = useParams();

  const [createurData, setCreateurData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreateurData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/createur/${id}`);
        setCreateurData(response.data);
      } catch (error) {
        console.error('Error fetching createur data:', error);
        setError('Error fetching createur data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCreateurData();
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!createurData) {
    return <div>No createur data found</div>;
  }

  const { nom, biographie, date_n, photo } = createurData;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Title level={2}>{nom}</Title>
        <p><strong>Date de naissance:</strong> {date_n}</p>
        <p style={{ width: '100%', wordWrap: 'break-word' }}><strong>Biographie:</strong> {biographie}</p>
      </div>
      {photo ? (
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <img src={photo} alt="Createur" style={{ width: '50%', height: '75%' }} />
        </div>
      ) : (
        <div>No photo available</div>
      )}
    </div>
  );
}

export default VoirCreateur;
