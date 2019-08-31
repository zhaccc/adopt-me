import React, {useState, useEffect} from 'react';
import pet from '@frontendmasters/pet';
import Carousel from './Carousel';
import ErrorBoundaries from './ErrorBoundaries'

const Details = (props) => {
  const [animalDetails, setAnimalDetails] = useState({
    name: null,
    animal: null,
    location: null,
    description: null,
    media: null,
    breed: null,
    loading: true
  })

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
          loading: false
        })
      }, console.error) // eslint-disable-line no-console
  }, [props.id])

  if (animalDetails.loading) {
    return <h1>Loading...</h1>
  }

  const {name, animal, breed, location, description, media} = animalDetails

  return (
    <div className='details'>
      <Carousel media={media} />
      <div>
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
        <button>Adopt {name}</button>
        <p>{description}</p>
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
