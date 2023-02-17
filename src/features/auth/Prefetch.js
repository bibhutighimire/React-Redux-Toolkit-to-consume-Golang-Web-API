import {store} from '../../app/store'
import { employeeApiSlice } from '../employees/employeeApiSlice'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'


const Prefetch = () => {

useEffect(() => {
    console.log('pre fetching .....')
    const employee = store.dispatch(employeeApiSlice.endpoints.reademployees.initiate())
    return () => {
        console.log('fetching canceled')
        employee.unsubscribe()
    }
}, [])

  return <Outlet />
}

export default Prefetch