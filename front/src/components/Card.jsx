import { Badge, Col, Row } from 'antd'
import '../styles/components/Card.scss'

import styled, { css } from 'styled-components'

const StyledStatus = styled.div(
  () => css`
    display: flex;
    justify-content: center;

    > span {
      padding-top: 2vh;
      > span {
        height: 20px;
        width: 20px;
      }
    }
  `
)

const Card = ({
  title,
  description,
  img = 'https://pbs.twimg.com/media/FS_UvxeWYAEmFmV?format=jpg&name=4096x4096',
  price,
  handleClick = () => {},
  status = '',
}) => {
  return (
    <div className="card" onClick={handleClick}>
      <div className="card__content">
        <img src={img} className="card__image" alt="img" />
        <Row className="card__header">
          <Col span={status ? 22 : 24}>
            <h2 className="card__title">{title}</h2>
          </Col>
          {status ? (
            <Col span={2}>
              <StyledStatus>
                <Badge status={`${status}`} />
              </StyledStatus>
            </Col>
          ) : (
            ''
          )}
          <p className="card__price">R${price}</p>
        </Row>
        {description}
      </div>
    </div>
  )
}

export { Card }
