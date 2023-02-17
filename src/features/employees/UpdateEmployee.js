import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { selectEmpById, useUpdateemployeeMutation } from './employeeApiSlice'
import { useState, useEffect } from 'react'

const UpdateEmployee = () => {
  const [updateemployee, {
    isSuccess: isEditSuccess
  }] = useUpdateemployeeMutation()
  const navigate = useNavigate()
  const {id} = useParams()
  const employee = useSelector(state=> selectEmpById(state, id))

  const[name, setName] = useState(employee.name)
  const[email, setEmail] = useState(employee.email)

  const handleEmailChange = (e) => {setEmail(e.target.value) }
    const handleNameChange = (e) => {setName(e.target.value)}
    
    const handleUpdate = (e) => {
      e.preventDefault()
      updateemployee({id:employee.id, name, email})
    }
    useEffect(()=> {
      if(isEditSuccess) {
        setEmail('')
        setName('')
        navigate('/reademployees')
      }
    },[isEditSuccess, navigate])

  return (
    <form onSubmit={handleUpdate}>
      Enter Full Name: <input type='text' name='name' onChange={handleNameChange} value={name}/>
      Enter Email Address: <input type='text' name='email' onChange={handleEmailChange} value={email}/>
      <button type='submit'>Update</button>
    </form>
  )
}

export default UpdateEmployee