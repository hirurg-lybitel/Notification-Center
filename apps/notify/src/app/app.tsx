// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import HomePage from './homepage/homepage';
import socketIO from "socket.io-client";
import { useState, useEffect, useRef } from 'react';

export interface IUser {
  name: string;
  date: string;
}

const App = () =>{
  const [isConnected, setIsConnected] = useState(false);
  const [lastPong, setLastPong] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);

  const socketRef = useRef<null | any>(null)

  useEffect(() => {
    socketRef.current = socketIO("http://localhost:4001");

    socketRef.current?.on('connect', () => {
      setIsConnected(true);
    });

    socketRef.current?.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current?.on('pong', (data: any) => {
      const { user, date } = data;
      setLastPong(new Date(date).toISOString());
      setLastName(user);
    });

    socketRef.current?.on('users', (users: IUser[]) => {
      setUsers(users);
    });

    socketRef.current?.on('pong', (data: any) => {
      const { user, date } = data;
      setLastPong(new Date(date).toISOString());
      setLastName(user);
    });

    return () => {
      socketRef.current?.off('connect');
      socketRef.current?.off('disconnect');
      socketRef.current?.off('pong');
      socketRef.current?.disconnect();
    };
  }, []);

  const sendPing = () => {
    socketRef.current?.emit('ping');
  }

  return (
    <>
      {/* <NxWelcome title="notify" /> */}
      <HomePage sendPing={sendPing} isConnected={isConnected} lastPong={lastPong} socket={socketRef.current} lastName={lastName} users={users} />
      <div />
    </>
  );
}

export default App;
