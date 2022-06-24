import { Col, Row, Avatar, Button } from 'antd'
import styled, { css } from 'styled-components'



const StyledHeader = styled.div(
    () => css`
        background: #FEFDF9;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
        border-radius: 0px 0px 25px 25px;
        padding: 20px 10vw;

        .controls {
            .ant-btn {
                border-color: transparent;
            }

            .ant-btn-primary {
                background-color: transparent;
                border-color:#fa7456;
                color: #fa7456;
            }
        }
    `
)

const Header = () => {
    const isLoggedInMOCK = false;
    return (
        <StyledHeader>
            <Row justify='space-between'>
                <Col>
                    <Avatar
                        alt={"Sonnenlicht Logo"}
                        shape={"square"}
                    />
                    <b> Sonnenlicht </b>
                </Col>
                <Col span={12}>
                    <Row justify='space-evenly' className='controls'>
                        <Col>
                            <Button type={"primary"}>
                                <b>Home</b>
                            </Button>
                        </Col>
                        <Col>
                            <Button>
                                <b>About Us</b>
                            </Button>
                        </Col>
                        <Col>
                            <Button>
                                <b>Listings</b>
                            </Button>
                        </Col>
                    </Row>
                </Col>
                {isLoggedInMOCK ?
                    <Button type={'primary'}>
                        <b>Logout</b>
                    </Button> :
                    <Button type={'primary'}>
                        <b>Login</b>
                    </Button>
                }
            </Row>
        </StyledHeader>
    )
}

export default Header