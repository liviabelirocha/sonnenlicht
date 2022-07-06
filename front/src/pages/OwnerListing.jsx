import { Col } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Card } from '../components/Card'
import Filter from '../components/Filter'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useUserData } from '../hooks/useUserData'

import Offer from './Offer'

const cardItems = [
  {
    title: 'title1',
    details: 'description1',
    img: 'img1',
    price: '$ 500.000',
    status: 'approved',
  },
  {
    title: 'title2',
    details: 'description2',
    img: 'img2',
    price: 'price2',
    status: 'reproved',
  },
]

const OwnerListing = ({ houses = [] }) => {
  const [filteredHouses, setFilteredHouses] = useState(houses)
  const [originalHouses, setOriginalHouses] = useState(houses)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [currentOffer, setCurrentOffer] = useState(cardItems[0])

  const { userData } = useUserData()

  useEffect(() => {
    const fetchOffers = async () => {
      const offers = await axios.get(
        'https://sonnenlicht-back.herokuapp.com/api/my-offers',
        {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${userData.token}`,
          },
        }
      )
      const approvedOffers = offers.data
      console.log(approvedOffers)
      setOriginalHouses(approvedOffers)
      setFilteredHouses(approvedOffers)
    }
    fetchOffers()

    // for (let i = 0; i < 3; i++) {
    //   newHouses.push({
    //     title: 'Apartamento em Fortaleza',
    //     city: 'Fortaleza',
    //     details: [
    //       'Beautiful family OwnerListing give us the ability to stay by the sea with amazing blue background full of light of the sky, Florina give us its gentle side.',
    //     ],
    //     img: 'https://pbs.twimg.com/media/FS_UvxeWYAEmFmV?format=jpg&name=4096x4096',
    //     price: '6.000',
    //   })
    //   newHouses.push({
    //     title: 'Apartamento em São Paulo',
    //     city: 'São Paulo',
    //     details: [
    //       'Beautiful family OwnerListing give us the ability to stay by the sea with amazing blue background full of light of the sky, Florina give us its gentle side.',
    //     ],
    //     img: 'https://pbs.twimg.com/media/FS_UvxeWYAEmFmV?format=jpg&name=4096x4096',
    //     price: '6.000',
    //   })
    // }
  }, [])

  const handleChangeCity = (e) => {
    const newCity = e.target.value
    if (newCity === 'all') return setFilteredHouses(originalHouses)
    setFilteredHouses(
      originalHouses.filter((house) => {
        return house.address_location === newCity
      })
    )
  }

  const allOptions = (option) => {
    if (option === 'All') {
    }
  }

  const handleFilter = ({
    offerType,
    location,
    propertyType,
    averagePrice,
  }) => {
    setFilteredHouses(
      originalHouses.filter((house) => {
        return (
          (house.address_location === location || location === 'All') &&
          (house.property_type === propertyType || propertyType === 'All') &&
          (house.offer_type === offerType || offerType === 'All') &&
          (parseInt(house.price) < parseInt(averagePrice) ||
            averagePrice === 'All')
        )
      })
    )
  }

  const handleCardClick = (offer) => {
    setCurrentOffer(offer)
    setIsModalOpen((curr) => !curr)
  }

  const StyledModal = styled.div(() => css``)

  return (
    <>
      <Header></Header>
      <div className="OwnerListing-layout">
        <div className="filter_section">
          <Filter handleFilter={handleFilter}></Filter>
        </div>
        <h2 className="content__title-section">Properties</h2>
        <div className="content">
          {filteredHouses.length === 0
            ? ''
            : filteredHouses.map((house, index) => {
              console.log(house)
                return (
                  <Card
                    key={`card-${index}`}
                    title={house.title}
                    description={house.description}
                    img={house.img}
                    price={house.price}
                    status={house.status}
                    handleClick={() => handleCardClick(house)}
                  ></Card>
                )
              })}
        </div>
      </div>
      <Modal
        title="Oferta"
        style={{
          top: 10,
        }}
        visible={isModalOpen}
        onCancel={handleCardClick}
        footer={null}
        width="80vw"
      >
        <Col style={{ height: '80vh', width: '100vw' }}>
          <Offer {...currentOffer}></Offer>
        </Col>
      </Modal>
      <Footer></Footer>
    </>
  )
}

export { OwnerListing }
