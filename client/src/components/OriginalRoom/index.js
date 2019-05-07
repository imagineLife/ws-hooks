import React, {useState, useEffect} from 'react';
import Messages from '../Messages'

export default function Room({socketProp}) {
  console.log('ROOM!');
 
  const [inRoom, setInRoom] = useState(false);
  const [inRoomB, setInRoomB] = useState(false);
  const [curRoom, setCurRoom] = useState(null)

   useEffect(() => {

    if(inRoom && socketProp !== null) {
      console.log('joining room');
      socketProp.emit('join-room', {room: 'test-room'});
      setCurRoom('test-room')
    }

    if(inRoomB && socketProp !== null) {
      console.log('joining room B');
      socketProp.emit('join-room-b', {room: 'room-b'});
      setCurRoom('room-b')
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
  }, [inRoom, inRoomB]);

  const handleInRoom = () => {
    inRoom && socketProp  !== null
      ? setInRoom(false)
      : setInRoom(true);
  }

  const handleInRoomB = () => {
    inRoomB && socketProp  !== null
      ? setInRoomB(false)
      : setInRoomB(true);

      setCurRoom(null)
  }

  console.log('curRoom')
  console.log(curRoom)
  

 return(
  <div>
    <h1>
      {inRoom && `You Have Entered join-Room` }
      {inRoomB && `You Have Entered Room-B` }
      {!inRoom && !inRoomB && `Outside Room` }
    </h1>

    {!inRoomB && 
      <button onClick={() => handleInRoom()}>
        {inRoom && `Leave Room` }
        {!inRoom && !inRoomB && `Enter Room` }
      </button>
    }

    {!inRoom && 
      <button onClick={() => handleInRoomB()}>
        {inRoomB && `Leave RoomB` }
        {!inRoom && !inRoomB && `Enter RoomB`}
      </button>
    } 

    <Messages inRoom={inRoom} curRoom={curRoom} socketProp={socketProp}/>

  </div>
  );
}