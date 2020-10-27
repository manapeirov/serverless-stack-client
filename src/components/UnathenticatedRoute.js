import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";

export default function UnauthenticatedRoute(props) {
  const { isAuthenticated } = useAppContext();

  const querystring = (name, url = window.location.href) => {
    name = name.replace(/[[]]/g, "\\$&");

    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
    const results = regex.exec(url);

    if (!results) {
      return null;
    }

    if (!results[2]) {
      return "";
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  const redirect = querystring("redirect");

  return isAuthenticated ? (
    <Route
      component={() => (
        <Redirect to={redirect === "" || redirect === null ? "/" : redirect} />
      )}
    />
  ) : (
    <Route {...props} />
  );
}

// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { useAppContext } from "../libs/contextLib";
//
// export default function UnauthenticatedRoute({ children, ...rest }) {
//   const { isAuthenticated } = useAppContext();
//   return (
//     <Route {...rest}>
//       {!isAuthenticated ? (
//         children
//       ) : (
//         <Redirect to="/" />
//       )}
//     </Route>
//   );
// }
