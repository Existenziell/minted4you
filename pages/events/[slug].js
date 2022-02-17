import Image from 'next/image'
import Link from 'next/link'
import { events } from '../../lib/events'

const Event = ({ event }) => {
  return (
    <div className="px-4 pb-16 mt-16">
      <h1 className="text-2xl md:text-4xl mb-16">Minted<span className='text-highlight'>4</span>you</h1>

      <div className={`bg-header${event.image} relative flex justify-left items-center gap-8 bg-no-repeat bg-cover h-64 mx-2 mb-2`}>
        {/* <Image src={`/events/header${index + 1}.png`} alt='Event1' width={1320} height={280} /> */}
        <div className='text-lg md:text-2xl text-brand-dark font-extrabold rounded backdrop-blur-sm bg-white bg-opacity-30 md:flex items-center px-2 py-4 ml-4'>
          <p className='w-16 inline-block'>
            {event.date[0]}
          </p>
          <span className='pt-0 block md:inline-block'>-</span>
          <p className='w-16 block md:inline-block'>
            {event.date[1]}
          </p>
        </div>

        <div className='text-left'>
          <h2 className='text-2xl md:text-4xl mb-4'>{event.name}</h2>
          <div>
            <span className='text-sm text-gray-300'>LOCATION</span>
            <span className='text-lg block'>{event.location}</span>
          </div>
        </div>
      </div>

      <div className='border border-highlight my-4 mx-2 rounded p-4 leading-relaxed'>
        {event.desc}
      </div>

      <h2 className='mt-12 text-lg text-left ml-2'>Available Tickets:</h2>
      <div className='flex flex-wrap'>
        {event.tickets.map((t, i) => {
          return (
            <div className='w-full  md:w-1/2 lg:w-1/3 rounded p-2 relative' key={i}>
              <Image src={`/events/${event.image}_${i + 1}.png`} alt={`Ticket-${i + 1}`} width={576} height={1024} />

              <div className='absolute left-0 bottom-0 right-0 bg-brand-dark bg-opacity-60 backdrop-blur-sm text-left p-4'>
                <div className='px-4 flex flex-col justify-evenly h-full'>
                  <div className='absolute top-4 right-4 rounded bg-white bg-opacity-60 backdrop-blur-sm px-2 py-1'>
                    <p className='text-xs text-right'>SECTION<span className='block text-lg'>{t.section}</span></p>
                  </div>
                  <p className='text-xs text-gray-100 mb-8'>SALE</p>
                  <p className='mb-2 text-2xl w-56'>{event.name}: {event.country}</p>
                  <p className='text-lg'>{t.name}</p>

                  <hr className='my-8' />

                  <div className='flex justify-between'>
                    <div className='flex flex-col'>
                      <span className='text-xs text-gray-100'>PRICE</span>
                      <span className='mt-2'>${t.price}</span>
                    </div>
                    <div className='text-right flex flex-col w-2/3'>
                      <span className='text-xs text-gray-100 mb-2'>LOCATION</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <Link href={`/events/tickets/${t.slug}`}><a className='button mt-8 mb-4 w-full text-center'>Buy Now</a></Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export async function getStaticProps(ctx) {
  const slug = ctx.params.slug
  let event = events.filter((e) => (e.slug === slug))[0]
  event = JSON.parse(JSON.stringify(event))

  return {
    props: { event }
  }
}

export async function getStaticPaths() {
  const paths = events.map(event => {
    return ({
      params: { slug: event.slug },
    })
  })
  return { paths, fallback: false }
}

export default Event
