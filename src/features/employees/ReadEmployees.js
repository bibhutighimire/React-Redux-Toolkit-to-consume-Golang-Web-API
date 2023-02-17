import React from 'react'
import { useReademployeesQuery } from './employeeApiSlice'
import Employee from './Employee'

const ReadEmployees = () => {

  const {
data: employee,
isSuccess
  } = useReademployeesQuery()
let content
  if(isSuccess) {
const {ids, entities} = employee
console.log("IDS:", ids)
console.log("ENTITIES:", entities)
const tableData = ids.map(empId => <Employee key= {empId} empId={empId} />)


content = (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {tableData}
    </tbody>
  </table>
)
  }
  return content
}

export default ReadEmployees