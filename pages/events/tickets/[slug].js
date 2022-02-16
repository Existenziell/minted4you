import Image from 'next/image'
import Link from 'next/link'
import { events } from '../../../lib/events'

const Event = ({ ticket }) => {
  console.log("dscsdchsdchc", ticket);

  const event = events[0]

  return (
    <div className="px-4 pb-16 mt-16">
      <h1 className="text-2xl md:text-4xl mb-16">Minted<span className='text-highlight'>4</span>you</h1>




      <div className='flex flex-col md:flex-row md:items-start md:gap-8'>
        <Image src={`/events/${ticket.image}.png`} alt={`Ticket-${ticket.image}`} width={576} height={1024} />

        <div className='bg-brand-dark bg-opacity-60 backdrop-blur-sm text-left w-full md:w-1/2'>
          <div className='flex flex-col justify-evenly h-full my-8 md:my-0'>

            <h2 className='mb-4 text-4xl'>{event.name}: {event.country}</h2>
            <h3 className='text-2xl'>{ticket.name}</h3>
            <div className='rounded-sm border border-highlight flex items-center px-3 py-1 w-max my-4'>
              <img src='/icons/ticket.svg' />
              <span>Ticket</span>
            </div>

            <p className='text-gray-400 mt-8'>LOCATION:</p>
            <p className='text-xl'>{event.location}</p>
            <p className='text-gray-400 mt-4'>SECTION:</p>
            <p className='text-lg'>{ticket.section}</p>
            <p className='text-gray-400 mt-4'>DATE:</p>
            <p className='text-lg'>{event.date[0]} - {event.date[1]}, {event.date[2]}</p>

            <hr className='my-8' />
            <p className='text-gray-400 mb-2'>PRICE</p>
            <p className='text-4xl'>${ticket.price}</p>

            <button className='button mt-8 mb-4 w-full'>Buy</button>
          </div>
        </div>
      </div>

      <div className='my-8 border border-highlight rounded-sm p-4'>{event.desc}</div>

    </div>
  )
}

export async function getStaticProps(ctx) {
  const slug = ctx.params.slug

  let ticket = events[0].tickets.filter((t) => (t.slug === slug))[0]
  console.log(ticket);
  ticket = JSON.parse(JSON.stringify(ticket))

  return {
    props: { ticket }
  }
}

export async function getStaticPaths() {
  console.log(events[0].tickets);
  const paths = events[0].tickets.map(ticket => {
    return ({
      params: { slug: ticket.slug },
    })
  })
  return { paths, fallback: false }
}

export default Event
