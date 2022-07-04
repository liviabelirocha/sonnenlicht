import { Alert, Button, Checkbox, Col, Form, Input } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import useToken from '../hooks/useToken'
import { useUserData } from '../hooks/useUserData'

const StyledContainer = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding-top: 25vh;

    > div {
      width: 50%;
    }

    .login-alert {
      margin-bottom: 3vh;
    }

    .hidden {
      display: none;
    }

    .registerButton {
      margin-left: 2vw;
    }
  `
)

const SignIn = () => {
  const [email, setUserName] = useState()
  const [password, setPassword] = useState()
  const [hasAlert, setHasAlert] = useState(false)

  const { setUserData } = useUserData()

  const loginUser = async (body) => {
    try {
      const res = await axios
        .post('https://sonnenlicht-back.herokuapp.com/api/auth', body)
      return res.data
    } catch (error) {
      setHasAlert(true)
    }
  }

  const onFinish = async (values) => {
    const data = await loginUser({
      email,
      password,
    })
    setUserData(data)
  }
  

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <StyledContainer>
      <div>
        <Col>
          <h1>Login</h1>
        </Col>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input onChange={(e) => setUserName(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 4, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Alert className={`login-alert ${!hasAlert && 'hidden'}`} message="Invalid data!" type="error" />

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button className="signInButton" type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              className="registerButton"
              htmlType="button"
              onClick={() => {}}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </StyledContainer>
  )
}

export default SignIn
