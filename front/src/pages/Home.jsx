import { Col } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Card } from '../components/Card'
import Filter from '../components/Filter'
import Footer from '../components/Footer'
import Header from '../components/Header'

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
  }, [])

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

  const StyledListing = styled.div(
    () => css`
      .container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }

      .home-layout {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 100%;
      }

      .filter_section {
        margin: 5vh 0;

        .city {
          background-color: transparent;
          color: #000;
          border-radius: 0.2rem;
          height: 5vh;
          width: 50%;
        }
      }

      .content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(12rem, 18rem));
        gap: 4rem;
        justify-content: center;

        &__title-section {
          margin: 0 0 5vh 3vw;
        }
      }

      .footer {
        margin-top: 8.5vh;
        height: auto;
      }
    `
  )

  return (
    <StyledListing>
      <div className="container">
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
        <div className="footer">
          <Footer></Footer>
        </div>
      </div>
    </StyledListing>
  )
}

export { Home }
