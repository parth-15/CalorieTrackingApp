import {Route, Redirect} from 'react-router-dom';

import {useAuthenticatedUser} from '../../providers/AuthProvider';

export default function AppRoute({
  component: Component,
  restrictedTo,
  ...otherProps
}) {
  const autheticatedUser = useAuthenticatedUser();

  if (!restrictedTo) {
    return <Route {...otherProps} render={props => <Component {...props} />} />;
  }

  if (restrictedTo === 'guest') {
    return (
      <Route
        {...otherProps}
        render={props =>
          !autheticatedUser.role ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }

  if (restrictedTo === 'authenticated') {
    return (
      <Route
        {...otherProps}
        render={props =>
          ['user', 'admin'].includes(autheticatedUser.role) ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }

  if (restrictedTo === 'admin') {
    return (
      <Route
        {...otherProps}
        render={props =>
          autheticatedUser.role === 'admin' ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
}
