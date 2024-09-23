import React from 'react'
import { InputContainer } from './styles'


function Input({value, onChange}) {
  return (
    <InputContainer>
      <input value={value} onChange={onChange} placeholder='Digite o UserName/Repositório' />
    </InputContainer>
  )
}

export default Input
