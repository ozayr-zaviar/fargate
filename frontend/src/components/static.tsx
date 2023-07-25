import React from 'react';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

function Static() {
  return (
    <div>
      <h1>Welcome to my static page</h1>
      <p>Here are some images:</p>
      <img src={image1} alt="Image 1" />
      <img src={image2} alt="Image 2" />
      <img src={image3} alt="Image 3" />
    </div>
  );
}

export default Static;