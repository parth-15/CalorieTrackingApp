import AppRoute from './components/common/AppRoute';
import AuthProvider from './providers/AuthProvider';
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Switch>
        <AppRoute
          restrictedTo="guest"
          exact
          path="/login"
          // component={Login}
        />
        <AppRoute
          restrictedTo="authenticated"
          exact
          path="/"
          // component={Home}
        />
        <AppRoute
          restrictedTo="admin"
          exact
          path="/admin"
          // component={Admin}
        />

        <Route
          path="*"
          // component={Error404}
        />
      </Switch>
    </AuthProvider>
  );
}

export default App;
