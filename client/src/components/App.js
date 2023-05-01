import '../App.css';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Calls from '../pages/Calls';
import Leads from '../pages/Leads';
import SalesReps from '../pages/SalesReps';
import Login from '../pages/Login';

import { useContext, useEffect} from "react";
import { UserContext } from '../context/user';

function App() {

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, [setUser]);

  if (!user) return <Login/>

  return (
<>  
    <NavBar/>
    <main>
      <Switch>
        <Route exact path='/'>
          <SalesReps/>
        </Route>
        <Route path='/leads'>
          <Leads/>
        </Route>
        <Route path='/calls'>
          <Calls/>
        </Route>
      </Switch>
    </main>    
</>
  );
}

export default App;
