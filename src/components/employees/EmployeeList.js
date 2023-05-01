import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllEmployees } from "../../managers/EmployeeManager"
import "./Employees.css"

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([])
  const [specialties, setSpecialties] = useState("")

  useEffect(
    () => {
      getAllEmployees()
        .then((res) => setEmployees(res))
    },
    []
  )

  useEffect(() => {
    const justSpecialties = employees.map(emp => emp.specialty)
    setSpecialties(justSpecialties.join(", "))
  }, [employees])


  return (
    <>
      <div className="specialties">
        <strong>Team Specialties</strong>: {specialties}
      </div>
      <h2>Employee Roster</h2>
      {
        employees.map(
          (employee) => {
            return <Link key={`employee--${employee.id}`} to={`/employees/${employee.id}`}>
              <p>{employee.full_name}</p>
            </Link>
          }
        )
      }
    </>
  )
}
