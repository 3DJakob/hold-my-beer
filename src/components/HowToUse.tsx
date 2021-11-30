import React from 'react'
// @ts-expect-error
import styled from 'styled-components'

const Container = styled.div`
    
`

const Title = styled.div`
    color: #fff;
    margin: 10px;
    display: flex;
    align-items: center;
`

const Number = styled.div`
    background-color: #fff;
    color: #000;
    border-radius: 26px;
    height: 26px;
    width: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bolder;
    margin-right: 6px;
`

const HowToUse: React.FC = () => {
  return (
    <Container>
      <Title><Number>1</Number> Sök efter din favoritöl</Title>
      <Title><Number>2</Number> Klicka på ölen</Title>
      <Title><Number>3</Number> Upptäck nya goda ölar!</Title>
    </Container>
  )
}

export default HowToUse
