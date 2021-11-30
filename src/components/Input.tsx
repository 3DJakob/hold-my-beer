import React, { useState } from 'react'
// @ts-expect-error
import styled from 'styled-components'
import { ReactComponent as Cross } from './times-solid.svg'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    margin: 20px;
    background-color: #fff;
    overflow: hidden;
`

const SearchInput = styled.input`
    display: flex;
    padding: 20px;
    margin: 0;
    font-size: 16px;
    max-width: 400px;
    width: -webkit-fill-available;
    background-color: #fff;
    -webkit-appearance: none;
    border:none;
    background-image:none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    box-sizing: border-box;
    
    :focus {
      outline: none;
      outline-width: 0;
    }
`

export interface InputProps {
  placeholder?: string
  onChange: (text: string) => void
  onClear?: () => void
}

const Input: React.FC<InputProps> = ({ onChange, onClear }) => {
  const [value, setValue] = useState('')
  return (
    <Container>
      <SearchInput
        value={value} onChange={(e: any) => {
          onChange(e.target.value)
          setValue(e.target.value)
        }}
        placeholder='Sök efter en öl'
      />
      <Cross
        onClick={() => {
          setValue('')
          onChange('')
        }}
        style={{ height: 20, padding: 20, color: '#444' }}
      />
    </Container>
  )
}

export default Input
