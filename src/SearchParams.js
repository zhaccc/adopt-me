import React, { useState, useEffect } from 'react'
import pet, { ANIMALS } from '@frontendmasters/pet'
import Results from './Results'
import useDropdown from './useDropdown'

const SearchParams = () => {
  const [location, setLocation] = useState('Seattle, WA')
  const [breeds, setBreeds] = useState([])
  const [pets, setPets] = useState([])
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS)
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds)

  useEffect(() => {
    setBreeds([])
    setBreed('')

    async function requestBreeds () {
      const {breeds: apiBreeds} = await pet.breeds(animal)
      const breedsArray = apiBreeds.map(({ name }) => name)
      setBreeds(breedsArray)
    }

    requestBreeds()

  }, [animal, setBreed, setBreeds])

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    setPets(animals || []);
  }

  return (
    <div className='search-params'>
      <form onSubmit={(e) => {
        e.preventDefault()
        requestPets()
      }}>
        <label htmlFor='location'>
          Location
          <input
            id='location'
            value={location}
            placeholder='location'
            onChange={e => setLocation(e.target.value)}
            />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets}/>
    </div>
  )
}

export default SearchParams
