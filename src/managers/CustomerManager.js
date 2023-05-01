import { getToken } from "../utils/getToken"

export const getAllCustomers = () => {
  return fetch("http://localhost:8000/customers", {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  })
    .then(res => res.json())
}
