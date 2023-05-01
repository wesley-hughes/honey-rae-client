import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getEmployeeById } from "../../managers/EmployeeManager"
export const Employee = () => {
    const [employee, setEmployee] = useState({})
    const { employeeId } = useParams()

    useEffect(
        () => {
            getEmployeeById(employeeId).then((res) => setEmployee(res))
        },
        [employeeId]
    )

    return (
        <>
            <section className="employee">
                <h3 className="employee__name">{employee.full_name}</h3>
                <div className="employee__specialty">Specialty is {employee.specialty}</div>
            </section>
        </>
    )
}
