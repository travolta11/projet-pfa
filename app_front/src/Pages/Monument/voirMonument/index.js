import React from 'react';
import { Card, Carousel } from 'antd';
import './styles.css'
const { Meta } = Card;

const VoirMonument = () => {
  const data = {
    "titre": "Palais de la Bahia",
    "description": "Le Palais de la Bahia est un magnifique palais situé dans la médina de Marrakech, au Maroc. Construit à la fin du XIXe siècle, ce palais est réputé pour son architecture marocaine traditionnelle et sa splendeur. Il est considéré comme l'un des sites les plus emblématiques de Marrakech et attire des milliers de visiteurs chaque année.",
    "ville": "Marrakech",
    "createur": "Si Moussa",
    "horaire": "09:00 AM 06:00 PM",
    "frais": "50 DH",
    "avis": 5,
    "images": [
      "https://cdn.glitch.global/d909b612-2c11-45a8-a0be-eeac87381e02/gettyimages-982756382-612x612.jpg?v=1713482036224",
      "https://cdn.glitch.global/d909b612-2c11-45a8-a0be-eeac87381e02/gettyimages-982756382-612x612.jpg?v=1713482036224",
      "https://cdn.glitch.global/d909b612-2c11-45a8-a0be-eeac87381e02/gettyimages-982756382-612x612.jpg?v=1713482036224"
    ]
  };

  const { titre, ville, createur, horaire, frais, avis, description, images } = data;

  return (
    <div>
      <h1>{titre}</h1>
      <p><strong>Ville:</strong> {ville}</p>
      <p><strong>Créateur:</strong> {createur}</p>
      <p><strong>Horaire:</strong> {horaire}</p>
      <p><strong>Frais:</strong> {frais}</p>
      <p><strong>Avis:</strong> {avis}</p>
      <p><strong>Description:</strong> {description}</p>

      <Carousel autoplay>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index}`} style={{ width: '600px', height: '500px' }}  />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default VoirMonument;
