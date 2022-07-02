import { Steps, Form, Input, PageHeader, Select, Upload, InputNumber, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions'
import styled, { css } from 'styled-components'
import { StepPanel } from '../components/StepPanel'

const { Step } = Steps
const { TextArea } = Input

const StyledContainer = styled.div(
  () => css`
    display: flex;
    flex-direction:column;
    justify-content: flex-end;
    align-items: center;

    width: 100%;
    margin-top: 3vh;
  `
)

const CreateOffer = () => {
  const [stepForm] = Form.useForm()

  const onFinish = (fieldsValue) => {
    const formData = stepForm.getFieldsValue()

    // POST the data to backend and show Notification
    console.log(formData)
  }

  const onFinishFailed = (errorInfo) => {
    message.error(`Submit failed: ${errorInfo.errorFields[0].errors[0]}`)
  }

  const DescribeOffer = () => {
    return (
      <>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input a title' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input a description' }]}>
          <TextArea />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input a price' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="offer-type" label="Offer Type" rules={[{ required: true, message: 'Please select a offer type' }]}>
          <Select placeholder='Select offer type'>
            <Option value='sell'>Sell</Option>
            <Option value='rent'>Rent</Option>
          </Select>
        </Form.Item>
      </>
    )
  }


  const SubmitAddr = () => {
    return (
      <>
        <Form.Item name="district" label="District" rules={[{ required: true, message: 'Please input a district' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="street" label="Street" rules={[{ required: true, message: 'Please input a street address' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="number" label="Number" rules={[{ required: true, message: 'Please input the house number' }]}>
          <InputNumber />
        </Form.Item>
      </>
    )
  }

  const SubmitImage = () => {
    return (
      <>
        <Form.Item name="image" label='image'>
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
    <PageHeader title="Create offer">
      <StyledContainer>
        <Form form={stepForm} onFinish={onFinish} onFinishFailed={onFinishFailed} layout={'vertical'}>
          <StepPanel steps={steps} />
        </Form>
      </StyledContainer>
    </PageHeader>
  )
}

export default CreateOffer
