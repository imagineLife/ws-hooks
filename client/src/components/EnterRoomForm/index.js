import React, {useState, useEffect} from 'react';

export default function EnterRoomForm({enterRoom}) {
  console.log('Call Center!');
  const [pwVal, setPwVal] = useState('')

  const onSubmit = (e) => {
  	e.preventDefault()
  	if(pwVal == 'trialPW'){
  		enterRoom();
  	}else{
  		setPwVal('')
  	}
  }

 return(
  <form onSubmit={onSubmit}>
  	<input placeholder="enter password..." value={pwVal} onChange={e => setPwVal(e.target.value)}/>
  </form>
  );
}