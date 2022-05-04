import {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';

const Logout = () => {
  const [user, setUser] = useContext(MediaContext);
  setUser(null);
  localStorage.clear();
  return <>{!user ? <Navigate to="/login" /> : <div>Loading...</div>}</>;
};

export default Logout;
