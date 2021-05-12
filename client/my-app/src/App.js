
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
let socket;
const CONNECTION_PORT = "localhost:3030/";

const App = () =>  {
  const my_ref = useRef({})
  
  const[message,setMessages] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault();
    await socket.emit("send_message",  my_ref.current['input'].value); 
      my_ref.current['input'].value = '';
  }
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages([...message, data]);
    });
  });
  const handleRef = (name) => (el) => my_ref.current[name]=el
  return (
    <>
   <Messages_ul ref={handleRef('message')}>
   {message.map((msg) => (
            <Messages_li>{msg}</Messages_li>
        ))}
  
   </Messages_ul>
   < Form ref={handleRef('form')} onSubmit={handleSubmit}>
     <Input ref={handleRef('input')} autocomplete="off" />
     <Button>Send</Button>
     </Form>
   </>
  );
}
export default App;
const Form = styled.form`
background: rgba(0, 0, 0, 0.15);
padding: 0.25rem;
position: fixed;
bottom: 0;
left: 0;
right: 0;
display: flex;
height: 3rem;
box-sizing: border-box;
backdrop-filter: blur(10px);
`
const Input = styled.input`
 border: none;
 outline: none;
 padding: 0 1rem;
 flex-grow: 1;
 border-radius: 2rem;
 margin: 0.25rem;
`
const Button = styled.button`
background: #333;
border: none;
padding: 0 1rem;
margin: 0.25rem;
border-radius: 3px;
outline: none;
color: #fff;
`
const Messages_ul = styled.ul`
list-style-type: none;
margin: 0;
padding: 0;
`
const Messages_li = styled.li`
padding: 0.5rem 1rem;
`