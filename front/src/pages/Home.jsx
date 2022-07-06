import { Col } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Card } from '../components/Card'
import Filter from '../components/Filter'
import Footer from '../components/Footer'
import Header from '../components/Header'

import '../styles/pages/Home.scss'
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

const Home = ({ houses = [] }) => {
  const [filteredHouses, setFilteredHouses] = useState(houses)
  const [originalHouses, setOriginalHouses] = useState(houses)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const options = ['Fortaleza', 'São Paulo']

  const [currentOffer, setCurrentOffer] = useState(cardItems[0])

  useEffect(() => {
    const fetchOffers = async () => {
      const offers = await axios.get(
        'https://sonnenlicht-back.herokuapp.com/api/offers/?status=approved'
      )
      const approvedOffers = offers.data
      setOriginalHouses(approvedOffers)
      setFilteredHouses(approvedOffers)
    }
    fetchOffers()

    // for (let i = 0; i < 3; i++) {
    //   newHouses.push({
    //     title: 'Apartamento em Fortaleza',
    //     city: 'Fortaleza',
    //     details: [
    //       'Beautiful family home give us the ability to stay by the sea with amazing blue background full of light of the sky, Florina give us its gentle side.',
    //     ],
    //     img: 'https://pbs.twimg.com/media/FS_UvxeWYAEmFmV?format=jpg&name=4096x4096',
    //     price: '6.000',
    //   })
    //   newHouses.push({
    //     title: 'Apartamento em São Paulo',
    //     city: 'São Paulo',
    //     details: [
    //       'Beautiful family home give us the ability to stay by the sea with amazing blue background full of light of the sky, Florina give us its gentle side.',
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
      <div className="home-layout">
        <div className="filter_section">
          <Filter handleFilter={handleFilter}></Filter>
        </div>
        <h2 className="content__title-section">Properties</h2>
        <div className="content">
          {filteredHouses.length === 0
            ? ''
            : filteredHouses.map((house, index) => {
                return (
                  <Card
                    key={`card-${index}`}
                    title={house.title}
                    description={house.description}
                    img={house.img}
                    price={house.price}
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
        <Col style={{ height: '85vh', width: '100vw' }}>
          <Offer {...currentOffer} status="normal"></Offer>
        </Col>
      </Modal>
      <Footer></Footer>
    </>
  )
}

export { Home }
