import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import {apiSlice} from '../../app/api/apiSlice'

const empAdapter = createEntityAdapter({})
const initialState = empAdapter.getInitialState()
console.log("INITIAL STATE:", initialState)
export const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        reademployees: builder.query({
            query: () => '/employees',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: resData => {
                const newRes = resData.employees.map(emp => {
                    emp.id = emp.ID
                    emp.name = emp.Name
                    emp.email = emp.Email
                    return emp
                })
                return empAdapter.setAll(initialState, newRes)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [{type:'Employee', id: 'LIST'},
                            ...result.ids.map(id => (
                                {type:'Employee', id}))
                ]
                }
                else {
                    return [{type:'Employee', id: 'LIST'}]
                }
                
            }
        }),

        createemployee: builder.mutation({
            query: ({name, email}) => ({
                url: '/employee',
                method: 'POST',
                body: {
                    name, email
                }
            }),
            invalidatesTags: [{type:'Employee', id: 'LIST'} ]
        }),

        deleteemployee: builder.mutation({
            query: ({id}) => ({
                url:`/employee/${id}`,
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags:(result, error, arg) => {
                return [{type:'Employee', id: arg.id}]
            }
        }),

        updateemployee: builder.mutation({
            query: ({id, name, email}) => ({
                url:`/employee/${id}`,
                method: 'PUT',
                body: {
                    name, email
                }
            }),
            invalidatesTags:(result, error, arg) => {
                return [{type:'Employee', id: arg.id}]
            }
        })
    })
})

export const {
useReademployeesQuery,
useCreateemployeeMutation,
useDeleteemployeeMutation,
useUpdateemployeeMutation
} = employeeApiSlice

export const readempSelect = employeeApiSlice.endpoints.reademployees.select()

const readEmpData = createSelector(readempSelect, newData=>newData.data)

export const {
selectAll: selectAllEmp,
selectById: selectEmpById
} = empAdapter.getSelectors(state => readEmpData(state))