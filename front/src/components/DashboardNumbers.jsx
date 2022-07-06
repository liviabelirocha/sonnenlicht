import styled, { css } from 'styled-components'

const StyledDashboardNumbers = styled.div(
  () => css`
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 50vw;
      margin: 10vh 0 10vh;
      padding-left: 4vw;

      border: 2px solid black;
      border-radius: 30px;

      .pending_reviews {
        display: flex;
        flex-direction: column;
        margin: 3vh;
        font-size: 2.5rem;
        font-weight: 600;
      }

      .houses_available {
        display: flex;
        flex-direction: column;
        margin: 2vh;
        color: gray;
        font-size: 1.8rem;
        font-weight: 600;
      }
    }
  `
)

const StyledNumber = styled.span(
  ({ color }) => css`
    color: ${color};
  `
)

const DashboardNumbers = ({ pending_reviews = 69, houses_available = 420 }) => {
  return (
    <StyledDashboardNumbers>
      <div>
        <div className="pending_reviews">
          <span>
            You have{' '}
            <StyledNumber color="#fa7456">{pending_reviews}</StyledNumber>
          </span>
          <span>pending reviews</span>
        </div>
      </div>
    </StyledDashboardNumbers>
  )
}

export default DashboardNumbers
