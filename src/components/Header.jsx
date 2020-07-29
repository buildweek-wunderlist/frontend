import React from 'react';
import styled from 'styled-components'

const StyledHeader = styled.header`
  background-color: #81b29a;
  margin:0;

  h1 {
    padding: 15px;
  }
`

const Header = () => {
    return (
        <StyledHeader>
<h1>Wonderlist 2.0</h1>
        </StyledHeader>
    )
}

export default Header