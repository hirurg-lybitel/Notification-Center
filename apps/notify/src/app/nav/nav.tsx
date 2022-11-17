import styles from './nav.module.css';
import { useState, useEffect } from 'react';
import socketIO from "socket.io-client";

/* eslint-disable-next-line */
export interface NavProps {
  socket: any
}

export function Nav(props: NavProps) {
  const { socket } = props;

  const [open, setOpen] = useState(true);
  const [notifications, setNotifications] = useState<any>({});
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // socket.on("message", (data: any) => setNotifications(data));

    socket?.on("pong", (data: any) => setNotifications(data));
    socket?.on("users", (data: any) => setUsers(data));
  }, [socket]);

  console.log('notifications', notifications);

  return (
    <nav className={styles['navbar']}>
      <div className={styles['empty']} />
      <div>
          <div>
              <button onClick={() => setOpen(!open)}>BELL ICON </button>
          </div>
      </div>
      <div
        className={styles['notifyContent']}
        hidden={!open}
      >
        <div>
          {/* {Object.keys(notifications).length > 0
            ? <div className={styles['notifyItem']}>
              {`Пользователь ${notifications['user']} сделал ping в ${new Date(notifications['date']).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })}`}
            </div>
            : <div>{'No notifications for you :('}</div>} */}

          {users?.map(u => <div className={styles['notifyItem']}>{`User ${u.name} connected at ${new Date(u.date).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })}`}</div>)}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
