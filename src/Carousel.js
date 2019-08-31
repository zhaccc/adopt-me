import React, {useState} from 'react';

const Carousel = (props) => {
  const [active, setActive] = useState(0)

  const handleIndexClick = (index) => {
    setActive(index)
  }

  return (
    <div className='carousel'>
      <img src={props.media[active].large} alt='animal' />
      <div className='carousel-smaller'>
        {props.media.map((photo, index) => (
          // eslint-disable-next-line
          <img
            key={photo.large}
            onClick={() => handleIndexClick(index)}
            data-index={index}
            src={photo.large}
            className={index === active ? 'active' : ''}
            alt='animal-thumbnail'
            />
        ))}
      </div>
    </div>
  )
}

export default Carousel;
