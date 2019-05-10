import React, {useState, useEffect} from 'react';
import EnterRoomForm from '../EnterRoomForm'

export default function CallCenter({socketProp}) {

  const [inStatus, setInStatus] = useState(false)
  const [listening, setListening] = useState(false)
  const [roomListData, setRoomListData] = useState(false)

  //if NOT in room
  useEffect(() => {
    if(socketProp && inStatus == true && listening == false){
      console.log('socketProp');
      console.log(socketProp);
      socketProp.emit('join-call-center', socketProp.id)
      setListening(true)
    }
  }, [inStatus])

  useEffect(() => {
    if(socketProp && inStatus == true && listening == true){
      console.log('setting listener for pass-current-room-data');
      socketProp.on('pass-current-room-list', roomListData => {
        console.log('roomListData')
        console.log(roomListData)
        setRoomListData(roomListData)
      })
    }
  }, [inStatus, listening])
  
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
      {!inStatus && <EnterRoomForm enterRoom={enterRoom} formType={'callCenter'}/>}
    </div>
  );
}