import React from 'react';
import './index.css';

import plus from '../../images/plus.svg';
import bin from '../../images/bin.svg';
import pencil from '../../images/pencil.svg';
import blackStar from '../../images/star-black.svg';
import yellowStar from '../../images/star-yellow.svg';

const Icon = (props) => {
  switch (props.name) {
    case 'add':
      return <img src={plus} alt={plus} className='Svg--add' />;
    case 'delete':
      return <img src={bin} alt={bin} className='Svg' />;
    case 'edit':
      return <img src={pencil} alt={pencil} className='Svg' />;
    case 'addFavorite':
      return <img src={blackStar} alt={blackStar} className='Svg' />;
    case 'isFavorite':
      return <img src={yellowStar} alt={yellowStar} className='Svg' />;
    default:
  }
};

export default Icon;
