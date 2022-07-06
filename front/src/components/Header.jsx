import { Col, Row, Avatar, Button } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { useUserData } from '../hooks/useUserData'

import LogoIcon from '../assets/logo.svg'

const StyledHeader = styled.div(
  () => css`
    background: #fefdf9;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
    border-radius: 0px 0px 25px 25px;
    padding: 20px 10vw;

    .controls {
      .ant-btn {
        background-color: transparent;
        border-color: transparent;
        box-shadow: none;
      }

      .ant-btn-primary {
        background-color: transparent;
        border-color: #fa7456;
        color: #fa7456;
      }
    }

    .login-register > button:first-child {
      margin-right: 1vw;
    }
  `
)

const Header = () => {
  const { userData, clearUserData } = useUserData()

  const navigate = useNavigate()

  const handleClick = (page) => {
    navigate(page)
  }

  const handleLogout = () => {
    clearUserData()
    navigate('/')
  }

  return (
    <StyledHeader>
      <Row justify="space-between">
        <Col>
          <img src={LogoIcon} alt="logo"></img>
        </Col>
        <Col span={12}>
          <Row justify="space-evenly" className="controls">
            <Col>
              <Button onClick={() => handleClick('/')}>
                <b>Home</b>
              </Button>
            </Col>
            <Col>
              <Button onClick={() => handleClick('/listing')}>
                <b>Listings</b>
              </Button>
            </Col>
            {userData?.role === 'Admin' && (
              <>
                <Col>
                  <Button onClick={() => handleClick('/manage-users')}>
                    <b>Manage Users</b>
                  </Button>
                </Col>
                <Col>
                  <Button onClick={() => handleClick('/manage-offers')}>
                    <b>Manage Offers</b>
                  </Button>
                </Col>
              </>
            )}
            {userData?.role === 'Owner' && (
              <>
                <Col>
                  <Button onClick={() => handleClick('/create-offer')}>
                    <b>Register Offer</b>
                  </Button>
                </Col>
                <Col>
                  <Button onClick={() => handleClick('/my-listing')}>
                    <b>My Offers</b>
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Col>
        {userData ? (
          <Button type={'primary'} onClick={handleLogout}>
            <b>Logout</b>
          </Button>
        ) : (
          <div className="login-register">
            <Button type={'primary'} onClick={() => navigate('/signin')}>
              <b>Login</b>
            </Button>
            <Button onClick={() => navigate('/signup')}>
              <b>Register</b>
            </Button>
          </div>
        )}
      </Row>
    </StyledHeader>
  )
}

export default Header
