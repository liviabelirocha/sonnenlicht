import { Router } from './router'
import styled, { css } from 'styled-components'

import 'antd/dist/antd.less'
import ApplicationProvider from './hooks'
import RouterAll from './routerAll'

const StyledApp = styled.div(
  () => css`
    font-family: 'Mate SC', serif;
  `
)

function App() {
  return (
    <ApplicationProvider>
      <StyledApp>
        <RouterAll />
      </StyledApp>
    </ApplicationProvider>
  )
}

export default App
