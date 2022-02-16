import SVGs from './SVGs'

const Footer = () => {
  return (
    <div className="relative bottom-0 left-0 right-0 h-24 px-8 bg-brand-dark text-brand flex justify-between items-center">
      <div className='w-full max-w-xs' style={{ maxWidth: '100px' }}>
        <SVGs />
      </div>
      <p className='text-xs'>© 2022 Minted4you</p>
    </div>
  )
}

export default Footer
