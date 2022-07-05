import { Col, Row, Card, Avatar, Button, Spin } from 'antd'
import { CheckOutlined, CloseOutlined, CompassFilled } from '@ant-design/icons'
import { useParams } from 'react-router-dom'

import styled, { css } from 'styled-components'
import axios from 'axios'
import { useUserData } from '../hooks/useUserData'
import { useState } from 'react'

export const defaultBackground =
  'https://pbs.twimg.com/media/FS_UvxeWYAEmFmV?format=jpg&name=4096x4096'

const renderStatus = (status, options) => {
  return status === 'normal'
    ? options.normal
    : status === 'approved'
    ? options.approved
    : status === 'rejected'
    ? options.rejected
    : status === 'pending'
    ? options.pending
    : ''
}

const makeOptions = (normal, approved, rejected, pending) => ({
  normal,
  approved,
  rejected,
  pending,
})

const StyledOffer = styled.section(
  ({ status, backgroundImage }) =>
    css`
      display: block;
      position: relative;
      max-height: 100vh;

      > div {
        width: 100%;
        justify-content: flex-start;
        align-items: flex-end;

        .price {
          display: flex;
          min-width: 10vw;
          width: auto;
          height: 5vh;
          align-items: center;
          margin: 0 0 13vh 3vw;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
          background-color: #fa7456;
          border-radius: 50px;

          > span {
            padding: 0 2vw;
          }
        }
      }

      > div:not(:first-child) {
        position: absolute;
        border-radius: 20px 20px 0 0;
      }

      > div:first-child {
        height: 40vh;
        background: url(${backgroundImage
          ? backgroundImage
          : defaultBackground});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
      }

      > div:nth-child(2) {
        display: block;
        padding: 3vh 0 0 2vw;

        height: 40vh;
        margin-top: -10vh;
        background-color: #fefdf9;

        .middle_header {
          display: flex;
          justify-content: space-between;

          .name_location {
            display: block;

            > span {
              font-size: 1.5rem;
            }

            > div {
              align-items: center;
              display: flex;

              > span {
                font-size: 1.2rem;
              }

              > div {
                color: gray;
                margin-left: 0.5vw;
                font-size: 1.5rem;
              }
            }
          }

          .validation__container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-right: 5vw;
            width: 15vw;

            .ant-btn:first-child {
              border: none;
              background: #00c750;
            }

            .ant-btn:nth-child(2) {
              border: none;
              background: #fa7456;
            }
          }
        }

        .middle__content {
          margin-top: 2vh;
          max-height: 15vh;

          > div:first-child {
            display: flex;
            justify-content: space-evenly;

            .detail-card {
              width: 120px;
              height: 140px;

              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-weight: 600;
            }
          }

          > div:nth-child(2) {
            > span {
              font-weight: 400;
            }
          }
        }
      }

      > div:nth-child(3) {
        z-index: 1;
        height: 15vh;
        margin-top: 25vh;
        background-color: ${renderStatus(
          status,
          makeOptions('#fa7456', '#008937', '#9F3000', '#FA7456')
        )};
        justify-content: space-between;
        align-items: center;

        > div:first-child {
          padding-left: 5vw;

          > div > h1,
          p {
            color: white;
          }
        }

        > div:last-child {
          padding-right: 5vw;

          > button {
            width: 200px;
          }
        }

        > div {
          display: flex;

          > div {
            padding-left: 2vw;
          }
        }
      }
    `
)

const StyledButton = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    > h2 {
      color: #fff;
    }
  `
)

const LowerBarOwner = (props) => {
  const { name, phone_number, email } = props.User
  return (
    <>
      <Col>
        <Avatar
          size={80}
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
        <div>
          <h1>
            <b>{name}</b>
          </h1>
          <p>Property Owner</p>
        </div>
      </Col>
      <StyledButton>
        <h2>Phone Number: {phone_number ? phone_number : '-'}</h2>
        <h2>Email: {email}</h2>
      </StyledButton>
    </>
  )
}

const StyledLowerBarStatus = styled.div(
  ({ status }) => css`
    display: flex;
    width: 100%;
    justify-content: ${status !== 'rejected' ? 'center' : 'space-evenly'};
    align-items: center;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;

    > span {
      max-width: 40vw;
      font-size: 0.9rem;
    }
  `
)

const MOCK_DEFAULT_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus
velit, enim facilisi pulvinar velit id. Orci mauris sed vel
blandit diam . `

const MOCK_REPROVED_DESCRIPTION = `Big description of why it was removed Big description of why it was
removed Big description of why it was removed`

const LowerBarStatus = ({
  status,
  statusName,
  description = MOCK_REPROVED_DESCRIPTION,
}) => {
  return (
    <StyledLowerBarStatus status={status} span={24}>
      {statusName}
      {status === 'rejected' && <span>{description}</span>}
    </StyledLowerBarStatus>
  )
}

const { Meta } = Card

const Offer = ({
  price = '$ 200.000',
  id,
  title = 'Family size House',
  description = MOCK_DEFAULT_DESCRIPTION,
  address_location = 'Berlin',
  address_number,
  address_street,
  area,
  bathroom_quantity,
  bedroom_quantity,
  offer_type,
  parking_slot_quantity,
  property_type,
  status = 'normal',
  Owner,
  adminValidation = false,
}) => {
  const params = useParams()

  const [isLoading, setIsLoading] = useState(false)

  const { userData } = useUserData()

  const handleAction = async (action) => {
    setIsLoading(true)
    console.log(id)
    await axios.patch(
      `https://sonnenlicht-back.herokuapp.com/api/${action}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }
    )
    window.location.reload()
    setIsLoading(false)
  }

  return (
    <StyledOffer status={status}>
      <Row>
        <div className="price">
          <span>${price}</span>
        </div>
      </Row>
      <Row>
        <Row className="middle_header">
          <Col>
            <div className="name_location">
              <span>
                <b>{title}</b>
              </span>
              <div>
                <CompassFilled />
                <div>{address_location}</div>
              </div>
            </div>
          </Col>
          {adminValidation && (
            <div className="validation__container">
              <Spin spinning={isLoading}>
                <Button
                  type="primary"
                  shape="round"
                  icon={<CheckOutlined />}
                  size={'large'}
                  onClick={() => handleAction("approve")}
                />
                <Button
                  type="primary"
                  shape="round"
                  icon={<CloseOutlined />}
                  size={'large'}
                  onClick={() => handleAction("reject")}
                />
              </Spin>
            </div>
          )}
        </Row>
        <Row className="middle__content">
          <Col span={12}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://media.istockphoto.com/photos/white-bathroom-picture-id187222933?k=20&m=187222933&s=170667a&w=0&h=ImTqUTwJ-q7EN5iYBuBNgjGzuzCNvYXfYA0KhknbyzM="
                  height="80px"
                />
              }
              className="detail-card"
            >
              {bathroom_quantity}
            </Card>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://media.istockphoto.com/photos/stylish-bedroom-interior-in-trendy-blue-picture-id1191685303?k=20&m=1191685303&s=612x612&w=0&h=5u54Q_8060N8e0Pc4iuu_PPCFkniSuoNxLbIKbcEf_4="
                  height="80px"
                />
              }
              className="detail-card"
            >
              {bedroom_quantity}
            </Card>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://t4.ftcdn.net/jpg/01/13/27/09/360_F_113270995_v0RgIm4UIV0VFJw30vM4ZeptxaeHZOuK.jpg"
                  height="80px"
                />
              }
              className="detail-card"
            >
              {parking_slot_quantity}
            </Card>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://previews.123rf.com/images/andreypopov/andreypopov1701/andreypopov170101095/69612931-different-size-of-houses-arranged-in-row-on-grassy-field.jpg"
                  height="80px"
                />
              }
              className="detail-card"
            >
              {area}
            </Card>
          </Col>
          <Col span={9} offset={2}>
            <h1>Description</h1>
            <span>{description}</span>
          </Col>
        </Row>
      </Row>
      <Row>
        {renderStatus(
          status,
          makeOptions(
            <LowerBarOwner {...Owner} status="normal" />,
            <LowerBarStatus status="approved" statusName="Approved" />,
            <LowerBarStatus status="reproved" statusName="Reproved" />,
            <LowerBarStatus status="pending" statusName="Pending" />
          )
        )}
      </Row>
    </StyledOffer>
  )
}

export default Offer
