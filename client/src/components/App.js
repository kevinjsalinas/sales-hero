import '../App.css';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Calls from '../pages/Calls';
import Leads from '../pages/Leads';
import SalesReps from '../pages/SalesReps';

import { useContext } from "react";
import { UserContext } from '../context/user';


function App() {

  const { user } = useContext(UserContext);

  // testing useContext
  console.log(user)

  return (
<>  
    <NavBar/>
    <main>
      <Switch>
        <Route path='/salesreps'>
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
