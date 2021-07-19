import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import ListContact from './components/ListContact';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import NotFound from './components/NotFound';


function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>
          <Route exact path="/" component={ListContact}></Route>
          <Route path="/contacts" component={ListContact}></Route>
          <Route path="/edit-contact/:id" component={ListContact}></Route>
          <Route component={NotFound} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
