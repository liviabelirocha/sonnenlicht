import { Col, Row, Card, Avatar, Button } from 'antd'
import { CompassFilled } from '@ant-design/icons'
import { useParams } from 'react-router-dom'

import styled, { css } from 'styled-components'

const renderStatus = (status, options) => {
  return status === 'normal'
    ? options.normal
    : status === 'approved'
    ? options.approved
    : status === 'reproved'
    ? options.reproved
    : status === 'pending'
    ? options.pending
    : ''
}

const makeOptions = (normal, approved, reproved, pending) => ({
  normal,
  approved,
  reproved,
  pending,
})

const StyledOffer = styled.section(
  ({ status }) =>
    css`
      display: block;
      position: relative;

      > div {
        width: 100%;
        justify-content: flex-start;
        align-items: flex-end;

        .price {
          display: flex;
          min-width: 20vw;
          width: auto;
          height: 7vh;
          align-items: center;
          margin: 0 0 13vh 3vw;
          justify-content: center;
          color: white;
          font-size: 2rem;
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
        height: 50vh;
        background: url(https://pbs.twimg.com/media/FS_UvxeWYAEmFmV?format=jpg&name=4096x4096);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
      }

      > div:nth-child(2) {
        display: block;
        padding: 3vh 0 0 2vw;

        height: 60vh;
        margin-top: -10vh;
        background-color: #fefdf9;

        .middle__header {
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

        .middle__content {
          margin-top: 5vh;
          max-height: 15vh;

          > div:first-child {
            display: flex;
            justify-content: space-evenly;
            padding-right: 10vw;

            .detail-card {
              width: 120px;
              height: 120px;
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
        height: 20vh;
        margin-top: 30vh;
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

const LowerBarOwner = () => {
  return (
    <>
      <Col>
        <Avatar
          size={80}
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
        <div>
          <h1>
            <b>Werner Siegfried</b>
          </h1>
          <p>Property Owner</p>
        </div>
      </Col>
      <div>
        <Button size="large">
          <b>Contact</b>
        </Button>
      </div>
    </>
  )
}

const StyledLowerBarStatus = styled.div(
  ({ status }) => css`
    display: flex;
    width: 100%;
    justify-content: ${status !== 'reproved' ? 'center' : 'space-evenly'};
    align-items: center;
    color: white;
    font-size: 2rem;
    font-weight: 600;

    > p {
      max-width: 40vw;
      font-size: 1rem;
    }
  `
)

const MOCK_REPROVED_DESCRIPTION = `Big description of why it was removed Big description of why it was
removed Big description of why it was removed Big description of why
it was removed Big description of why it was removed`

const LowerBarStatus = ({ status, statusName, description = MOCK_REPROVED_DESCRIPTION }) => {
  return (
    <StyledLowerBarStatus status={status} span={24}>
      {statusName}
      {status === 'reproved' && (
        <p>
          {description}
        </p>
      )}
    </StyledLowerBarStatus>
  )
}

const Offer = ({ preco = '$ 200.000', status = 'reproved' }) => {
  const params = useParams()
  return (
    <StyledOffer status={status}>
      <Row>
        <div className="price">
          <span>{preco}</span>
        </div>
      </Row>
      <Row>
        <Row className="middle__header">
          <span>
            <b>Family size House</b>
          </span>
          <div>
            <CompassFilled />
            <div>Berlin</div>
          </div>
        </Row>
        <Row className="middle__content">
          <Col span={12}>
            <Card className="detail-card" />
            <Card className="detail-card" />
            <Card className="detail-card" />
          </Col>
          <Col span={11}>
            <h1>Description</h1>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus
              velit, enim facilisi pulvinar velit id. Orci mauris sed vel
              blandit diam non sem felis. Id integer odio nam id nisi facilisi
              leo, egestas nam. Lorem ipsum dolor sit amet,
            </span>
          </Col>
        </Row>
      </Row>
      <Row>
        {renderStatus(
          status,
          makeOptions(
            <LowerBarOwner />,
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
