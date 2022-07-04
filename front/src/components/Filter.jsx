import { Button } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'
import '../styles/components/Filter.scss'
import FilterSelect from './FilterSelect'

const offerTypeOptions = ['All', 'sell', 'Buy']
const locationOptions = ['All', 'Fortaleza', 'São Paulo']
const propertyTypeOptions = ['All', 'small house', 'apartment', 'Mansion']
const averagePriceOptions = ['All', '1000', '1000000']

const Filter = ({ handleFilter, ...props }) => {
  const [offerType, setOfferType] = useState(offerTypeOptions[0])
  const [location, setLocation] = useState(locationOptions[0])
  const [propertyType, setPropertyType] = useState(propertyTypeOptions[0])
  const [averagePrice, setAveragePrice] = useState(averagePriceOptions[0])

  const handleFilterSearch = () => {
    handleFilter({ offerType, location, propertyType, averagePrice })
  }

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
      <Button
        type="primary"
        className="search_button"
        onClick={handleFilterSearch}
      >
        Search
      </Button>
    </div>
  )
}

export default Filter
