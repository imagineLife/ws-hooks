import React, {useState, useEffect} from 'react';

export default function EnterRoomForm({enterRoom, formType}) {
  console.log('EnterRoomForm!');
  const [inputVal, setInputVal] = useState('')

  const onSubmit = (e) => {
  	e.preventDefault()
  	if(formType="client"){
      enterRoom();
    }

    if(inputVal == 'trialPW'){
  		enterRoom();
  	}else{
  		setinputVal('')
  	}
  }

 return(
  <form onSubmit={onSubmit}>
  	<input 
      type={(formType == 'callCenter') ? 'password' : 'text'}
      placeholder="enter password..." 
      value={inputVal} 
      onChange={e => setInputVal(e.target.value)}/>
  </form>
  );
}