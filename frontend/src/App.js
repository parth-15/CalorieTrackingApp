import AppRoute from './components/common/AppRoute';
import AuthProvider from './providers/AuthProvider';
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import CreateFoodEntry from './pages/home/CreateFoodEntry';
import Meal from './pages/home/Meal';
import UserReport from './pages/home/UserReport';
import Admin from './pages/admin/Admin';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Switch>
        <AppRoute restrictedTo="guest" exact path="/login" component={Login} />
        <AppRoute
          restrictedTo="authenticated"
          exact
          path="/"
          component={Home}
        />
        <AppRoute
          restrictedTo="authenticated"
          exact
          path="/"
          component={Home}
        />
        <AppRoute
          restrictedTo="authenticated"
          exact
          path="/create"
          component={CreateFoodEntry}
        />
        <AppRoute
          restrictedTo="authenticated"
          exact
          path="/meals"
          component={Meal}
        />
        <AppRoute
          restrictedTo="authenticated"
          exact
          path="/userreport"
          component={UserReport}
        />
        <AppRoute restrictedTo="admin" exact path="/admin" component={Admin} />

        {/* <Route
          path="*"
          // component={Error404}
        /> */}
      </Switch>
    </AuthProvider>
  );
}

export default App;
