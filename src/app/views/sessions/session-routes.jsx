import { lazy } from "react";

const NotFound = lazy(() => import("./NotFound"));


// const JwtLogin = Loadable(lazy(() => import("./login/JwtLogin")));
// const JwtRegister = Loadable(lazy(() => import("./register/JwtRegister")));
// const Auth0Login = Loadable(lazy(() => import("./login/Auth0Login")));

const sessionRoutes = [
  { path: "*", element: <NotFound /> }
];


export default sessionRoutes;
