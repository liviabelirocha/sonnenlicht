import { Col, Row, Avatar, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'

const StyledFooter = styled.div(
    () => css`
        height: 25vh;
        padding: 20px;
        margin-top: 60px;
        background: #FEFDF9;
        border-radius: 25px 25px 0px 0px;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
    `
)

const logout = () => {
    sessionStorage.removeItem('token')
}

const Footer = () => {
    const isLogged = sessionStorage.getItem('token');
    const navigate = useNavigate();
    return (
        <StyledFooter>
            <Row justify={"space-between"} align={"middle"}>
                <Col span={10}>
                    <Row>
                        <Col>
                            <Avatar
                                shape={"square"}
                            />
                            <b> Sonnenlicht </b>
                        </Col>
                    </Row>
                    <Row>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus
                        velit, enim facilisi pulvinar velit id. Orci mauris sed vel
                        blandit diam non sem felis. Id integer odio nam id nisi facilisi
                        leo, egestas nam. Lorem ipsum dolor sit amet,
                    </Row>
                </Col>
                <Col span={5}>
                    <Row>
                        <Button type={'text'}><b>Home</b></Button>
                    </Row>
                    <Row>
                        <Button type={'text'}><b>Listings</b></Button>
                    </Row>
                    <Row>
                        <Button type={'text'}><b>About Us</b></Button>
                    </Row>
                </Col>
                <Col span={3}>
                    {isLogged ?
                        <Button type={'primary'} size={'large'} onClick={logout}>
                            <b>Logout</b>
                        </Button> :
                        <Button type={'primary'} size={'large'} onClick={() => navigate("/signin")}>
                            <b>Login</b>
                        </Button>
                    }
                </Col>
            </Row>
            <Row justify={'end'}>
                <Col>Sonnenlicht © All Rights Reserved</Col>
            </Row>
        </StyledFooter>
    )
}

export default Footer