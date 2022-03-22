import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Search from './components/search';
import Gallery from './components/gallery';
import Detail from './components/detail';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
            <Route path='/' exact component={Search}/>
            <Route path='/gallery' exact component={Gallery}/>
            <Route path='/:id'  exact component={Detail}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
