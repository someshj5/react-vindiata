import React, { useState } from 'react'
import DatePicker from 'react-date-picker'
import { fetchByDate } from '../service/taskService'

export default function TasksByDateRange() {
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [taskList, setTaskList] = useState([])
    const { __aT__ } = sessionStorage

    const handleSubmit = async () => {
        try {
            let values = {
                from_date: fromDate,
                to_date: toDate
            }
            const resp = await fetchByDate(values, __aT__)
            if (resp.data.data) {
                setTaskList(resp.data.data)
            }
        } catch (error) { console.log(error) }
    }

    const TasksArr =
        taskList.length > 0 &&
        taskList.map((task, idx) => {
            let name = task.name
            let project = task.project
            let created = new Date(task.start_time).toString()
            return (
                <tr key={idx}>
                    <td>{name}</td>
                    <td>{project}</td>
                    <td>{created}</td>
                </tr>
            )
        })

    return (
        <>
            <div className="bg-warning pb-3" >
                <div className="flex-row mt-4 pt-2 d-flex justify-content-center">
                    <div className="col-xl-2  col-lg-6 col-11 px-1">
                        <div className="input-group input-daterange">
                            <label className="text-danger font-weight-bold ">Select From Date Range :</label>
                            <DatePicker
                                onChange={setFromDate}
                                value={fromDate}
                            />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-6 col-11 px-1">
                        <div className="input-group input-daterange">
                            <label className="text-danger font-weight-bold ">Select To  Date Range :</label>
                            <DatePicker
                                onChange={setToDate}
                                value={toDate}
                            />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-6 pt-3 col-11 px-1">
                        <div className="input-group input-daterange">
                            <button onClick={handleSubmit} className="btn btn-primary mx-2 border-radius-8">
                                Fetch
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            {taskList.length > 0 ? (
                <table className="container">
                    <thead>
                        <tr>
                            <th>
                                <h1>Name</h1>
                            </th>
                            <th>
                                <h1>Project</h1>
                            </th>
                            <th>
                                <h1>Created at</h1>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {TasksArr}
                    </tbody>
                </table>
            ) : (<h1 className="mt-5">Sorry no data </h1>)}
        </>
    )
}
