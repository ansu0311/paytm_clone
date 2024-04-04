export const Heading = ({ label }) => {
  return (
    <div className='font-semibold text-3xl'>
        { label }
    </div>
  )
}

export const SubHeading = ({ label }) => {
  return (
    <div className='font-semibold text-mg text-teal-300'>
        { label }
    </div>
  )
}
