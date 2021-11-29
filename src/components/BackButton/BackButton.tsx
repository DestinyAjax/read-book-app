import React from 'react';
import { Link } from 'react-router-dom';
import { BackButtonStyle } from './BackButton.style';

export const BackButton = () => {
  return (
    <Link to="/">
      <BackButtonStyle>Close</BackButtonStyle>
    </Link>
  );
};
