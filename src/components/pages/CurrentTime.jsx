import React, { useState, useEffect } from 'react'

const CurrentTime = () => {
    
  // const [ date, setDate] = useState();

  const [time, setTime,] =useState(new Date())
  useEffect(() =>{
    setInterval(() => setTime(new Date()),1000) 
  },[])
  const currentDate = new Date().toLocaleDateString();

  return (
    <div>

                  <div className="currentDateTime">
                     <p className='currentTime'>{time.toLocaleTimeString()}</p>
                      
                     <p className='currentDate'>{currentDate}</p>
                  </div>
             


    </div>
  )
}

export default CurrentTime