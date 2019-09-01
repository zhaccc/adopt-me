import React, {useState, useEffect, useContext} from 'react';
import pet from '@frontendmasters/pet';
import {navigate} from '@reach/router';
import Modal from './Modal';
import Carousel from './Carousel';
import ErrorBoundaries from './ErrorBoundaries';
import ThemeContext from './ThemeContext';

const Details = (props) => {
  const [animalDetails, setAnimalDetails] = useState({
    name: null,
    animal: null,
    location: null,
    description: null,
    media: null,
    breed: null,
    url: null,
    loading: true
  })
  const [theme] = useContext(ThemeContext)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    pet.animal(props.id)
      .then(({animal}) => {
        setAnimalDetails({
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          url: animal.url,
          loading: false
        })
      }, console.error) // eslint-disable-line no-console
  }, [props.id])

  if (animalDetails.loading) {
    return <h1>Loading...</h1>
  }

  const toggleModal = () => setShowModal(!showModal)
  const adopt = () => navigate(animalDetails.url)

  const {name, animal, breed, location, description, media} = animalDetails

  return (
    <div className='details'>
      <Carousel media={media} />
      <div>
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
        <button onClick={toggleModal} style={{backgroundColor: theme}}>Adopt {name}</button>
        <p>{description}</p>
        {
          showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className='buttons'>
                  <button style={{backgroundColor: theme}} onClick={adopt}>Yes</button>
                  <button style={{backgroundColor: theme}} onClick={toggleModal}>No, I am a monster</button>
                </div>
              </div>
            </Modal>
          ) : null
        }
      </div>
    </div>
  )
}

export default function DetailsWithErrorBoundaries(props) {
  return (
    <ErrorBoundaries>
      <Details {...props} />
    </ErrorBoundaries>
  )
}
