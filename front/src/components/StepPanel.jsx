import React, { useState } from "react";
import styled, { css } from 'styled-components'
import { Button, Steps } from "antd";

const StepPanel = (props) => {
  const [activeStep, setActiveStep] = useState(0);

  const StyledContainer = styled.div(
    () => css`
      display: flex;
      flex-direction:column;
      justify-content: flex-end;
  
      width: 50vw;
      margin-top: 5vh;

      .steps-header {
        margin-bottom: 24px;
      }

      .steps-content {
        margin-top: 2vh;
      }

      .steps-action {
        align-self: flex-end;
      }

      .hidden {
        display: none;
      }
    `
  )

  function next() {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
  }

  function prev() {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
  }

  return (
    <StyledContainer className='step-panel-styled'>
      <Steps className="steps-header" current={activeStep}>
        {props.steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {props.steps.map((item) => (
        <div
          className={`steps-content ${
            item.step !== activeStep + 1 && "hidden"
          }`}
        >
          {item.content}
        </div>
      ))}
      <div className="steps-action">
        {activeStep > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {activeStep < props.steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {activeStep === props.steps.length - 1 && (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        )}
      </div>
    </StyledContainer>
  );
};

export { StepPanel };
