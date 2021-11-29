import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage, SearchPage } from './pages'

const App = () => {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/search" component={SearchPage} />
         </Switch>
      </Router>
   );
};

export default App;
