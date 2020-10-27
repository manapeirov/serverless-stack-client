import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";

export default function AuthenticatedRoute(props) {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext();

  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Route
      {...props}
      component={() => <Redirect to={`/login?redirect=${pathname}${search}`} />}
    />
  );
}

// export default function AuthenticatedRoute({ children, ...rest }) {
//   const { pathname, search } = useLocation();
//   const { isAuthenticated } = useAppContext();
//   return (
//     <Route {...rest}>
//       {isAuthenticated ? (
//         children
//       ) : (
//         <Redirect to={
//           `/login?redirect=${pathname}${search}`
//         } />
//       )}
//     </Route>
//   );
// }

// pass in the current path to the login page (redirect in the query string). Use this later to redirect back after the user logs in.
