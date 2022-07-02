import { Steps, Form, Input, PageHeader } from 'antd'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import { StepPanel } from '../components/StepPanel'

const { Step } = Steps

const StyledContainer = styled.div(
  () => css`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 100%;
    margin-top: 5vh;
    padding: 0 10vw;
  `
)

const CreateOffer = () => {
  const [stepForm] = Form.useForm()

  const [activeStep, setActiveStep] = useState(0)

  function next() {
    const nextStep = activeStep + 1
    setActiveStep(nextStep)
  }

  function prev() {
    const prevStep = activeStep - 1
    setActiveStep(prevStep)
  }

  const onFinish = (fieldsValue) => {
    const formData = stepForm.getFieldsValue()

    // POST the data to backend and show Notification
    console.log(formData)
  }

  const DescribeOffer = () => {
    return (
      <>
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
      </>
    )
  }

  const SubmitOffer = () => {}

  const steps = [
    {
      step: 1,
      title: 'Step1',
      content: <DescribeOffer />,
    },
    {
      step: 2,
      title: 'Step2',
      content: <SubmitOffer />,
    },
  ]

  return (
    <PageHeader title="Create offer">
      <StyledContainer>
        <Steps size="small" current={1}>
          <Step title="Finished" />
          <Step title="In Progress" />
          <Step title="Waiting" />
        </Steps>
        <Steps current={activeStep} style={{ width: 400 }}>
          <Form form={stepForm} onFinish={onFinish}>
            {steps.map((item) => (
              <Steps.Step key={item.title} title={item.title} />
            ))}
          </Form>
        </Steps>
      </StyledContainer>
    </PageHeader>
  )
}

export default CreateOffer
