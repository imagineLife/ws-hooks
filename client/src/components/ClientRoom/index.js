import React, {useState, useEffect} from 'react';
import Messages from '../Messages'

export default function Room({socketProp}) {
  console.log('ROOM!');
 
  const [inRoom, setInRoom] = useState(false);

   useEffect(() => {

    if(inRoom && socketProp !== null) {
      console.log('joining room');
      socketProp.emit('join-room', {room: 'test-room'});
      setCurRoom('test-room')
    }

    //like componentWillUnmount
    return () => {
      if(inRoom && socketProp  !== null) {
        console.log('leaving room');
        socketProp.emit('leave-room', {
          room: 'test-room'
        })
      }
    }
  }, [inRoom]);

  const handleInRoom = () => {
    inRoom && socketProp  !== null
      ? setInRoom(false)
      : setInRoom(true);
  }  

 return(
  <div>
    <h1>
      {inRoom && `You Have Entered join-Room` }
      {!inRoom && `Outside Room` }
    </h1>

    {!inRoom && 
      <button onClick={() => handleInRoom()}>
        {inRoom && `Leave Room` }
        {!inRoom && `Enter Room` }
      </button>
    }

  </div>
  );
}