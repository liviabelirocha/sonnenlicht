import { Col, Modal, Table } from 'antd'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import DashboardNumbers from '../components/DashboardNumbers'
import Footer from '../components/Footer'
import Header from '../components/Header'
import useToken from '../hooks/useToken'
import Offer from './Offer'
import SignIn from './SignIn'

const StyledTable = styled.div(
  () => css`
    display: block;
    margin: 0 5vw 0;
  `
)

const offers = [
  {
    title: 'Apartamento em Fortaleza',
    location: 'Fortaleza',
    street: 'Belo Horizonte',
    details: [
      'Beautiful family home give us the ability to stay by the sea with amazing blue background full of light of the sky, Florina give us its gentle side.',
    ],
    img: 'https://pbs.twimg.com/media/FS_UvxeWYAEmFmV?format=jpg&name=4096x4096',
    price: '6.000',
  },
  {
    title: 'Apartamento em São Paulo',
    location: 'São Paulo',
    street: 'Belo Horizonte',
    details: [
      'Beautiful family home give us the ability to stay by the sea with amazing blue background full of light of the sky, Florina give us its gentle side.',
    ],
    img: 'https://pbs.twimg.com/media/FS_UvxeWYAEmFmV?format=jpg&name=4096x4096',
    price: '6.000',
  },
]

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

const ManageOffers = () => {
  const [currentOffer, setCurrentOffer] = useState(offers[0])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { token } = useToken()
  if(!token) {
    return <SignIn />
  }

  const handleCardClick = () => {
    setIsModalOpen((curr) => !curr)
  }

  let userFilterOptions = offers.reduce(
    (accumulate, offer) => {
      accumulate.titles = [...accumulate.titles, offer.title]
      accumulate.locations = [...accumulate.locations, offer.location]
      accumulate.streets = [...accumulate.streets, offer.street]
      accumulate.prices = [...accumulate.prices, offer.price]
      return accumulate
    },
    {
      titles: [],
      locations: [],
      streets: [],
      prices: [],
    }
  )

  let { titles, locations, streets, prices } = userFilterOptions

  titles = titles.filter(unique).map((title) => ({ text: title, value: title }))
  locations = locations
    .filter(unique)
    .map((location) => ({ text: location, value: location }))
  streets = streets
    .filter(unique)
    .map((street) => ({ text: street, value: street }))
  prices = prices
    .filter(unique)
    .map((prices) => ({ text: prices, value: prices }))

  userFilterOptions = { titles, locations, streets, prices }

  const columns = [
    {
      title: 'Titulo',
      dataIndex: 'title',
      filterSearch: true,
      filterMode: 'tree',
      filters: userFilterOptions.titles,
      onFilter: (value, record) => record.title.includes(value),
    },
    {
      title: 'Local',
      dataIndex: 'location',
      filterSearch: true,
      filterMode: 'tree',
      filters: userFilterOptions.locations,
      onFilter: (value, record) => record.location.includes(value),
    },
    {
      title: 'Rua',
      dataIndex: 'street',
      filterSearch: true,
      filterMode: 'tree',
      filters: userFilterOptions.streets,
      onFilter: (value, record) => record.street.includes(value),
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      filterSearch: true,
      filterMode: 'tree',
      filters: userFilterOptions.prices,
      onFilter: (value, record) => record.price.includes(value),
    },
  ]

  const data = offers.map((offer, index) => ({
    key: `offer-${index + 1}`,
    title: `${offer.title}`,
    location: `${offer.location}`,
    street: `${offer.street}`,
    price: `${offer.price}`,
  }))

  return (
    <>
      <Header></Header>
      <DashboardNumbers pending_reviews={69} houses_available={420} />
      <StyledTable>
        <Table
          columns={columns}
          dataSource={data}
          onRow={(record) => {
            return {
              onClick: () => {
                setCurrentOffer({...record})
                handleCardClick()
              },
            }
          }}
        ></Table>
      </StyledTable>
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
          <Offer {...currentOffer} adminValidation></Offer>
        </Col>
      </Modal>
      <Footer></Footer>
    </>
  )
}

export default ManageOffers
