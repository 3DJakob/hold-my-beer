import React from 'react'
// @ts-expect-error
import styled from 'styled-components'

export interface TagProps {
  title: string
}

const Container = styled.div`
    background-color: #c69332;
    border-radius: 40px;
    color: #fff;
    padding: 0 10px;
    margin-right: 5px;
`

const Tag: React.FC<TagProps> = ({ title }) => {
  return (
    <Container>
      {title}
    </Container>
  )
}

export default Tag
