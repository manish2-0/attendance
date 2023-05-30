import React, { useState } from 'react'

const Testing4 = () => {

  const [time1, settime1] = useState("15:00")

  const handlechangetime = (e) => {
    console.log(e.target.value + ":00")
  }

  return (
    <div>
      <input defaultValue={time1} onChange={handlechangetime} name="time2" className='w-full sm:w-72 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="time" placeholder='Time' required />
    </div>
  )
}

export default Testing4