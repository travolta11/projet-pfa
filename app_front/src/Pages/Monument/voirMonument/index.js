import { Card, Carousel, Spin, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const { Meta } = Card;
const { Title } = Typography;

const VoirMonument = () => {
  const { id } = useParams();

  const [monumentData, setMonumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonumentData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/monument/${id}`);
        setMonumentData(response.data);
      } catch (error) {
        console.error('Error fetching monument data:', error);
        setError('Error fetching monument data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMonumentData();
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!monumentData) {
    return <div>No monument data found</div>;
  }

  const { titre, ville, createur, horaire, frais, avis, description, images } = monumentData;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Title level={2}>{titre}</Title>
        <p><strong>Ville:</strong> {ville}</p>
        <p><strong>Créateur:</strong> {createur}</p>
        <p><strong>Horaire:</strong> {horaire}</p>
        <p><strong>Frais:</strong> {frais}</p>
        <p><strong>Avis:</strong> {avis}</p>
        <p style={{ width: '100%', wordWrap: 'break-word' }}><strong>Description:</strong> {description}</p>
      </div>
      <Carousel autoplay style={{ width: '100%', maxWidth: '600px' }}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index}`} style={{ width: '50%', height: '75%' }} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default VoirMonument;
