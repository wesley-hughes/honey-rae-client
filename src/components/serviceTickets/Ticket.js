import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { isStaff } from "../../utils/isStaff"
import { getAllEmployees } from "../../managers/EmployeeManager"
import { getTicketById, deleteTicket, updateTicket } from "../../managers/TicketManager"
import { ticketStatus } from "./TicketToolbox"

export const Ticket = () => {
  const [ticket, setTicket] = useState({})
  const [employees, setEmployees] = useState([])
  const { ticketId } = useParams()
  const navigate = useNavigate()

  const fetchTicket = () => {
    getTicketById(ticketId)
      .then((res) => setTicket(res))
  }

  useEffect(
    () => {
      fetchTicket()
    },
    [ticketId]
  )

  useEffect(
    () => {
      getAllEmployees().then((res) => setEmployees(res))
    }, []
  )

  const deleteTicketEvent = () => {
    deleteTicket(ticketId).then(() => navigate("/"))
  }

  const updateTicketEvent = (evt) => {
    const updatedTicket = {
      ...ticket,
      employee: parseInt(evt.target.value)
    }

    updateTicket(updatedTicket).then(() => fetchTicket())
  }
  const doneTicketEvent = (evt) => {
    function formatDate(date) {
      const d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    
      let updatedMonth = month;
      let updatedDay = day;
    
      if (month.length < 2) updatedMonth = '0' + month;
      if (day.length < 2) updatedDay = '0' + day;
    
      return [year, updatedMonth, updatedDay].join('-');
    }
    
    
    const formattedDate = formatDate(new Date());
 
  
    // Use a local variable for the modified ticket
    let completedTicket = {...ticket};
    completedTicket.date_completed = formattedDate;
  
    updateTicket(completedTicket)
  };


  // const ticketStatus = () => {
  //   if (ticket.date_completed === null) {
  //     if (ticket.employee) {
  //       return <span className="status--in-progress">In progress</span>
  //     }
  //     return <span className="status--new">Unclaimed</span>
  //   }
  //   return <span className="status--completed">Done</span>
  // }
  const isTicketCompleted = () => {
    return ticket.date_completed !== null;
  }
  

  // const employeePicker = () => {
  //   if (isStaff()) {
  //     return <div className="ticket__employee">
  //       <label>Assign to:</label>
  //       <select
  //         value={ticket.employee?.id}
  //         onChange={updateTicketEvent}>
  //         <option value="0">Choose...</option>
  //         {
  //           employees.map(e => <option key={`employee--${e.id}`} value={e.id}>{e.full_name}</option>)
  //         }
  //       </select>
  //       <button onClick={doneTicketEvent}>Mark Done</button>
  //     </div>
  //   }
  //   else {
  //     return <div className="ticket__employee">Assigned to {ticket.employee?.full_name ?? "no one"}</div>
  //   }
  // }
  const employeePicker = () => {
    if (isStaff()) {
      return (
        <div className="ticket__employee">
          <label>Assign to:</label>
          <select
            value={ticket.employee?.id}
            onChange={updateTicketEvent}
          >
            <option value="0">Choose...</option>
            {employees.map((e) => (
              <option key={`employee--\${e.id}`} value={e.id}>
                {e.full_name}
              </option>
            ))}
          </select>
          {!isTicketCompleted() && <button onClick={doneTicketEvent}>Mark Done</button>}
        </div>
      );
    } else {
      return (
        <div className="ticket__employee">
          Assigned to {ticket.employee?.full_name ?? "no one"}
        </div>
      );
    }
  };
  

  return (
    <>
      <section className="ticket">
        <h3 className="ticket__description">Description</h3>
        <div>{ticket.description}</div>

        <footer className="ticket__footer ticket__footer--detail">
          <div className=" footerItem">Submitted by {ticket.customer?.full_name}</div>
          <div className="ticket__employee footerItem">
            {
              ticket.date_completed === null
                ? employeePicker()
                : `Completed by ${ticket.employee?.full_name} on ${ticket.date_completed}`
            }
          </div>
          <div className="footerItem">
            {ticketStatus(ticket)}
          </div>
          {
            isStaff()
              ? <></>
              : <><button onClick={deleteTicketEvent}>Delete</button></>
          }
        </footer>

      </section>
    </>
  )
}
