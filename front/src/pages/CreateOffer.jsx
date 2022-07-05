import {
  Steps,
  Form,
  Input,
  PageHeader,
  Select,
  Upload,
  InputNumber,
  Button,
  message,
  Spin,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Option } from 'antd/lib/mentions'
import styled, { css } from 'styled-components'
import { StepPanel } from '../components/StepPanel'
import axios from 'axios'
import { useState } from 'react'
import ErrorPage from './ErrorPage'
import SignIn from './SignIn'
import { useUserData } from '../hooks/useUserData'
import Header from '../components/Header'
import Footer from '../components/Footer'

const { Step } = Steps
const { TextArea } = Input

const StyledContainer = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    min-height: 60vh;
    justify-content: center;

    width: 100%;
    margin-top: 3vh;
  `
)

const CreateOffer = () => {
  const [stepForm] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const { userData } = useUserData()

  const postNewOffer = async (body) => {
    try {
      const res = await axios.post(
        'https://sonnenlicht-back.herokuapp.com/api/new-offer',
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.token}`,
          },
        }
      )
      setIsLoading(false)
      return res.data
    } catch (error) {
      throw new Error()
    }
  }

  const onFinish = (fieldsValue) => {
    setIsLoading(true)
    const formData = stepForm.getFieldsValue()

    // POST the data to backend and show Notification
    console.log(formData)
    postNewOffer(formData)
  }

  const onFinishFailed = (errorInfo) => {
    message.error(`Submit failed: ${errorInfo.errorFields[0].errors[0]}`)
  }

  const DescribeOffer = () => {
    const propertiesTypes = ['small house']

    return (
      <>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input a title' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input a description' }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          name="bedroomQuantity"
          label="Bedroom Quantity"
          rules={[
            { required: true, message: 'Please input a bedroom quantity' },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="bathroomQuantity"
          label="Bathroom Quantity"
          rules={[
            { required: true, message: 'Please input a bathrrom quantity' },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="parkingSlotQuantity"
          label="Parking Slots"
          rules={[
            { required: true, message: 'Please input a parking slot quantity' },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="area"
          label="Area"
          rules={[
            { required: true, message: "Please input the offers's area" },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please input a price' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="offerType"
          label="Offer Type"
          rules={[{ required: true, message: 'Please select a offer type' }]}
        >
          <Select placeholder="Select offer type">
            <Option value="sell">Sell</Option>
            <Option value="rent">Rent</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="propertyType"
          label="Property Type"
          rules={[{ required: true, message: 'Please select a property type' }]}
        >
          <Select placeholder="Select property type">
            {propertiesTypes.map((propertyType, index) => (
              <Option key={`${index + 1}`} value={propertyType}>
                {propertyType}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </>
    )
  }

  const SubmitAddr = () => {
    return (
      <>
        <Form.Item
          name="addressLocation"
          label="Location"
          rules={[{ required: true, message: 'Please input a location' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="addressStreet"
          label="Street"
          rules={[{ required: true, message: 'Please input a street address' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="addressNumber"
          label="Number"
          rules={[{ required: true, message: 'Please input the house number' }]}
        >
          <InputNumber />
        </Form.Item>
      </>
    )
  }

  const SubmitImage = () => {
    return (
      <>
        <Form.Item name="image" label="image">
          <Upload>
            <Button icon={<PlusOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </>
    )
  }

  const steps = [
    {
      step: 1,
      title: 'Describe Offer',
      content: <DescribeOffer />,
    },
    {
      step: 2,
      title: 'Address',
      content: <SubmitAddr />,
    },
    {
      step: 3,
      title: 'Image',
      content: <SubmitImage />,
    },
  ]

  return (
    <>
      <Header />
      <PageHeader title="Create offer">
        <Spin spinning={isLoading}>
          <StyledContainer>
            <Form
              form={stepForm}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout={'vertical'}
            >
              <StepPanel steps={steps} />
            </Form>
          </StyledContainer>
        </Spin>
      </PageHeader>
      <Footer />
    </>
  )
  // return (
  //   <PageHeader title="Create offer">
  //       <StyledContainer>
  //         <Form
  //           form={stepForm}
  //           onFinish={onFinish}
  //           onFinishFailed={onFinishFailed}
  //           layout={'vertical'}
  //         >
  //           <StepPanel steps={steps} />
  //         </Form>
  //       </StyledContainer>
  //     </PageHeader>
  // )
}

export default CreateOffer
