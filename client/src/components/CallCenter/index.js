import React, {useState, useEffect} from 'react';
import EnterRoomForm from '../EnterRoomForm'

export default function CallCenter({socketProp}) {
  console.log('Call Center!');
  const [inStatus, setInStatus] = useState(false)

  const enterRoom = () => setInStatus(true)

 return(
  <div>
      {inStatus && <h1>CallCenter</h1>}
    
    {!inStatus && <EnterRoomForm enterRoom={enterRoom} />}
  </div>
  );
}