import React from "react"
import styled from 'styled-components'

const StyledFooter = styled.footer`
  background-color: #81b29a;
  height: 10rem;
  display: flex;
  justify-content:center;
  align-items:center;
`

const Footer = () => {
  return (
    <StyledFooter>
      <h3>Wonderlist 2.0 by Lambda School</h3>
    </StyledFooter>
  )
}

export default Footer
