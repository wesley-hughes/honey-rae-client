import { getToken } from "../utils/getToken"

export const getTicketById = (id) => {
  return fetch(`http://localhost:8000/tickets/${id}`, {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  })
    .then(res => res.json())
}

export const addTicket = (ticket) => {
  return fetch("http://localhost:8000/tickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`
    },
    body: JSON.stringify(ticket)
  })
    .then(res => res.json())
}

export const getAllTickets = () => {
  return fetch("http://localhost:8000/tickets", {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  })
    .then(res => res.json())
}

export const searchTicketsByStatus = (status) => {
  return fetch(`http://localhost:8000/tickets?status=${status}`, {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  })
    .then(res => res.json())
}

export const updateTicket = (ticket) => {
  return fetch(`http://localhost:8000/tickets/${ticket.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`
    },
    body: JSON.stringify(ticket)
  })
}

export const deleteTicket = (id) => {
  return fetch(`http://localhost:8000/tickets/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${getToken()}`
    }
  }
  )
}

