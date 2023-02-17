import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectEmpById } from './employeeApiSlice'
import { useDeleteemployeeMutation } from './employeeApiSlice'
import { useNavigate } from 'react-router-dom'

const Employee = ({empId}) => {
  const navigate = useNavigate()

  const employee = useSelector(state => selectEmpById(state, empId))

const [deleteemployee, {
  isSuccess: isDeleteSuccess
}] = useDeleteemployeeMutation()

useEffect(()=> {
if(isDeleteSuccess) {
  navigate('/reademployees')
}
},[isDeleteSuccess, navigate])
  const handleDelete = (e) => {
e.preventDefault()
deleteemployee({id:employee.id})

  }

  const handleEdit = () => {
    navigate(`/${employee.id}`)
  }
  return (
    <tr>
     
      <td>{employee.Name}</td>
      <td>{employee.Email}</td>

      <td><button onClick={handleEdit}>Edit</button><button onClick={handleDelete}>Delete</button></td>

    </tr>
  )
}

export default Employee