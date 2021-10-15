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
import AdminReport1 from './pages/admin/AdminReport1';
import AdminReport2 from './pages/admin/AdminReport2';

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

        <AppRoute
          restrictedTo="admin"
          exact
          path="/adminreport1"
          component={AdminReport1}
        />

        <AppRoute
          restrictedTo="admin"
          exact
          path="/adminreport2"
          component={AdminReport2}
        />

        {/* <Route
          path="*"
          // component={Error404}
        /> */}
      </Switch>
    </AuthProvider>
  );
}

export default App;
