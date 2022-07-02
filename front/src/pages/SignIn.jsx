import { Button, Checkbox, Col, Form, Input } from 'antd'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import useToken from '../hooks/useToken'

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

    .registerButton {
      margin-left: 2vw;
    }
  `
)

async function loginUser(body) {
  // return fetch('http://localhost:8080/login', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(body),
  // }).then((data) => data.json())
  return "token-test"
}

const SignIn = () => {
  const [username, setUserName] = useState()
  const [password, setPassword] = useState()

  const { setToken } = useToken()

  const onFinish = async (values) => {
    const token = await loginUser({
      username,
      password,
    })
    setToken(token)
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
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              onChange={(e) => setUserName(e.target.value)}
            />
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
