import { Button } from 'antd'
import { useState } from 'react'
import '../styles/components/Filter.scss'
import FilterSelect from './FilterSelect'

const offerTypeOptions = ['Rent', 'Buy']
const locationOptions = ['Fortaleza', 'São Paulo']
const propertyTypeOptions = ['Small House', 'Apartment', 'Mansion']
const averagePriceOptions = ['$850 - $1200', '$1200 - $2000']

const Filter = (props) => {
  const [offerType, setOfferType] = useState(offerTypeOptions[0])
  const [location, setLocation] = useState(locationOptions[0])
  const [propertyType, setPropertyType] = useState(propertyTypeOptions[0])
  const [averagePrice, setAveragePrice] = useState(averagePriceOptions[0])

  return (
    <div className="filter" {...props}>
      <FilterSelect
        title={'Offer Type'}
        options={offerTypeOptions}
        selectActiveOption={offerType}
        handleChange={setOfferType}
      />
      <FilterSelect
        title="Location"
        options={locationOptions}
        selectActiveOption={location}
        handleChange={setLocation}
      ></FilterSelect>
      <FilterSelect
        title="Property Type"
        options={propertyTypeOptions}
        selectActiveOption={propertyType}
        handleChange={setPropertyType}
      ></FilterSelect>
      <FilterSelect
        title="Average Price"
        options={averagePriceOptions}
        selectActiveOption={averagePrice}
        handleChange={setAveragePrice}
      ></FilterSelect>
      <Button type="primary" className="search_button">
        Search
      </Button>
    </div>
  )
}

export default Filter
