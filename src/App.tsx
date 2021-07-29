import React , {Suspense} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './App.css';

const MainPage = React.lazy(() => import('./pages/main-page/main-page'));
const UserPage = React.lazy(() => import('./pages/user-page/user-page'));

function App() {
  return (
      <Router>
          <Suspense fallback={<div>Loading...</div>}>
              <Route path={'/'} exact component={MainPage} />
              <Route path={'/user/:login'} exact component={UserPage} />
          </Suspense>
      </Router>
  );
}

export default App;
