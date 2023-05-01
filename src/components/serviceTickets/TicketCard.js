import { TicketHeader } from "./TicketHeader"
import { TicketBody } from "./TicketBody"
import { TicketFooter } from "./TicketFooter"
import "./Tickets.css"

export const TicketCard = ({ ticket }) => {
  return <section className={`ticket ${ticket.emergency ? 'emergency' : ''}`}>
    <TicketHeader ticket={ticket} />
    <TicketBody ticket={ticket} />
    <TicketFooter ticket={ticket} />
  </section>
}
