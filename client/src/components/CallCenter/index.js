import React, {useState, useEffect} from 'react';
import EnterRoomForm from '../EnterRoomForm'

export default function CallCenter({socketProp}) {

  const [inStatus, setInStatus] = useState(false)
  
  const enterRoom = () => setInStatus(true)
  
  return(
    <div>
      {/* in-the-call-center*/}
      {inStatus && <React.Fragment>
        <h1>CallCenter</h1>
        <div className="client-list">
          <p>Client list goes here...</p>
        </div>
        </React.Fragment>}    

      {/* NOT in-the-call-center*/}
      {!inStatus && <EnterRoomForm enterRoom={enterRoom} />}
    </div>
  );
}