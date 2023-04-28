import '../App.css';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Calls from './Calls';
import Leads from './Leads';
import SalesReps from './SalesReps';


function App() {
  return (
<>  
    <NavBar/>    
    <Switch>
      <Route exact path='/'>
        <h1>Home Page</h1>
      </Route>
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

</>
  );
}

export default App;
