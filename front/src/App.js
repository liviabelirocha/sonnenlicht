import { Router } from './router'
import styled, { css } from 'styled-components'

import 'antd/dist/antd.less'

const StyledApp = styled.div(
  () => css`
    font-family: 'Mate SC', serif;
  `
)

function App() {
  return (
    <StyledApp>
      <Router />
    </StyledApp>
  )
}

export default App
