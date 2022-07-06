import { Alert, Button, Checkbox, Col, Form, Input } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
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

const SignUp = () => {
  const [email, setUserName] = useState()
  const [password, setPassword] = useState()
  const [hasAlert, setHasAlert] = useState(false)

  const [stepForm] = Form.useForm()

  const { setUserData } = useUserData()

  const navigate = useNavigate()

  const registerUser = async (body) => {
    const completeBody = {...body, role: "Owner"}
    try {
      const res = await axios
        .post('https://sonnenlicht-back.herokuapp.com/api/register', completeBody)
      return res.data
    } catch (error) {
      setHasAlert(true)
    }
  }

  const onFinish = async (values) => {
    const formData = stepForm.getFieldsValue()
    const data = await registerUser(formData)
    navigate("/")
    console.log(data)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <StyledContainer>
      <div>
        <Col>
          <h1>Register</h1>
        </Col>
        <Form
          form={stepForm}
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
            rules={[{ required: true, message: 'Please input an email!' }]}
          >
            <Input onChange={(e) => setUserName(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input a password!' }]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: 'Please input a phone number!' }]}
          >
            <Input onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input a name!' }]}
          >
            <Input onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Alert className={`login-alert ${!hasAlert && 'hidden'}`} message="Invalid data!" type="error" />

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button className="signInButton" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </StyledContainer>
  )
}

export default SignUp
