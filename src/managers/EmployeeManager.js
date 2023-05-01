import { getToken } from "../utils/getToken"

export const getEmployeeById = (id) => {
  return fetch(`http://localhost:8000/employees/${id}`, {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  })
    .then(res => res.json())
}

export const addEmployee = (employee) => {
  return fetch("http://localhost:8000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`
    },
    body: JSON.stringify(employee)
  })
    .then(res => res.json())
}

export const getAllEmployees = () => {
  return fetch("http://localhost:8000/employees", {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  })
    .then(res => res.json())
}
