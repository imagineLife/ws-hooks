import React, {useState, useEffect} from 'react';

function Messages({inRoom, socketProp, curRoom}) {

  console.log('%c MSGS start', 'background-color: tan; color: white;')
  
  const [messageCount, setMessageCount] = useState(0);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if(socketProp){
      socketProp.on('receive message', payload => {
        console.log('- - - receive message payload - - -')
        console.log(payload)
        console.log(' cur messageCount')
        console.log(messageCount)
        
        
        setMessageCount(messageCount + 1);
      });
    }
  });

  useEffect(() => {
    console.log('received new message');
    document.title = `${messageCount} new messages have been emitted`;
  }, [messageCount]); //only re-run the effect if new message comes in

  const handleSetTheme = () => {
    let newTheme = (theme === 'light') ? 'dark' : 'light';

    console.log('new theme: ' + newTheme);
    setTheme(newTheme);
  }

  const handleNewMessage = () => {
    console.log('emitting new message');
    socketProp.emit('new-message', { room: curRoom });

    setMessageCount(messageCount + 1);
  }

  console.log('PRE-RENDER messageCount')
  console.log(messageCount)
  console.log('// - - - - - //')
  

  return(
    <div className={`App Theme-${theme}`}>

        <p>{messageCount} messages have been emitted</p>

        {inRoom &&
          <button onClick={() => handleNewMessage()}>
            Emit new message
          </button>
        }

        <button onClick={() => handleSetTheme()}>
          Toggle Theme
        </button>
    </div>
  );
}

export default Messages;