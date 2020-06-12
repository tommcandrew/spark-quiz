import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Contacts from '../../screens/userScreens/Contacts';
import Groups from '../../screens/userScreens/Groups';
import CreateQuiz from '../../screens/userScreens/CreateQuiz';
import UserQuizes from '../../screens/userScreens/UserQuizes';

const MainNavigation = () => {
  return (
    <Router>
      <div>
        <nav className = 'side-drawer'>
          <ul>
            <li>
              <Link to="/">My Quizes</Link>
            </li>
            <li>
              <Link to="/groups">Groups</Link>
            </li>
            <li>
              <Link to="/contacts">Contacts</Link>
            </li>
            <li>
              <Link to="/createQuiz">Create quiz</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/createQuiz">
            <CreateQuiz />
          </Route>
          <Route path="/groups">
            <Groups />
          </Route>
          <Route path="/contacts">
            <Contacts />
          </Route>
          <Route path="/">
            <UserQuizes />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default MainNavigation;
