import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateemployeeMutation } from './employeeApiSlice'

const CreateEmployee = () => {
const navigate = useNavigate()

  const [ createemployee, {
    isSuccess: isEmpAddSuccess

  }] = useCreateemployeeMutation()
  const[name, setName] = useState('')
  const[email, setEmail] = useState('')

  const handleEmailChange = (e) => {setEmail(e.target.value) }
    const handleNameChange = (e) => {setName(e.target.value)}
      
useEffect(()=> {
if(isEmpAddSuccess) {
  setName('')
  setEmail('')
  navigate('/reademployees')
}
}, [isEmpAddSuccess,navigate])
  const handleCreate = (e) => {
  e.preventDefault()
  createemployee({name, email})
  }


  return (
    <form onSubmit={handleCreate}>
      Enter Full Name: <input type='text' name='name' onChange={handleNameChange}/>
      Enter Email Address: <input type='text' name='email' onChange={handleEmailChange}/>
      <button type='submit'>CREATE</button>
    </form>
  )
}

export default CreateEmployee