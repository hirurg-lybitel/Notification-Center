import styles from './homepage.module.css';
import Nav from '../nav/nav';
import { IUser } from '../app';

/* eslint-disable-next-line */
export interface HomePageProps {
  isConnected: boolean;
  lastPong: string | null;
  sendPing: () => void;
  lastName: string | null;
  socket: any;
  users: IUser[];
}

function HomePage({ isConnected, users, lastPong, lastName, sendPing, socket }: HomePageProps) {
  return (
    <div className={styles['container']}>
      <Nav socket={socket} />
      <h1>Welcome to HomePage!</h1>
      <div>
        <p>Connected: { '' + isConnected }</p>
        <p>Last pong: { lastPong || '-' } from { lastName || '-'}</p>
        <button onClick={ sendPing }>Send ping</button>
      </div>
      <h1>Users:</h1>
      <div>
        <ul>
        {users.map((el, idx) => {
          return <li key={idx}>
            <b>{el.name}</b> ({el.date})
          </li>
          }
        )}
        </ul>
      </div>
      <div>
          <img
              src='https://res.cloudinary.com/practicaldev/image/fetch/s--R9qwOwpC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/78hs31fax49uwy6kbxyw.png'
              alt='Dev.to'
              className='logo'
          />
      </div>
    </div>
  );
}

export default HomePage;
