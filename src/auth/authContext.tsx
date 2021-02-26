import React from "react";
import axios from "axios";

type UserDataInterface = { initialized: boolean; loggedIn: boolean; user: any };
type MyContextInterface = {
  authInfo: UserDataInterface;
  initialize: () => Promise<boolean>;
  logOut: () => Promise<boolean>;
  signUp: (username: string | undefined, email: string | undefined, password: string | undefined) => Promise<boolean | JSON>;
  logIn: (email: string | undefined, password: string | undefined) => Promise<boolean | JSON>;
};

// create the context
export const AuthContext = React.createContext<MyContextInterface | undefined>(
  undefined
);

// create the context provider, we are using use state to ensure that
// we get reactive values from the context...
type Props = {
  children: React.ReactNode;
};
export const AuthProvider: React.FC = (props: any) => {
  // the reactive values
  const [authInfo, setAuthInfo] = React.useState<UserDataInterface>();

  const logOut = () => {
    return new Promise((resolve) => {
      window.localStorage.removeItem("user");
      setAuthInfo({ initialized: true, loggedIn: false, user: null });
      setTimeout(() => {
        return resolve(true);
      }, 1000);
    });
  };

  const signUp = (username: string, email: string, password: string) => {
    return new Promise((resolve, reject) => {
      axios.post('https://mobile-back.herokuapp.com/auth/signup', { userName: username, email: email, password: password }).then((res) => {
        let v = {
          initialized: true,
          loggedIn: true,
          user: { email, token: res.data.token },
        };
        setAuthInfo(v);
        window.localStorage.setItem("user", JSON.stringify(v.user));
        return resolve(true);
      }).catch((err) => {
        return reject(err.response.data);
      })
    });
  };

  const logIn = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      if (!email || !password) {
        return reject({ message: "Entrer un nom d'utilisateur et un mot de passe" })
      }
      axios.post('https://mobile-back.herokuapp.com/auth/login', { email: email, password: password }).then((res) => {
        let v = {
          initialized: true,
          loggedIn: true,
          user: { email, token: res.data.token },
        };
        setAuthInfo(v);
        window.localStorage.setItem("user", JSON.stringify(v.user));
        return resolve(true);
      }).catch((err) => {
        return reject(err.response.data);
      })
    });
  };

  const initialize = () => {
    let response = window.localStorage.getItem("user") || null;
    if (response !== null) {
      setAuthInfo({
        initialized: true,
        loggedIn: true,
        user: JSON.parse(response),
      });
    } else {
      setAuthInfo({
        initialized: true,
        loggedIn: false,
        user: null,
      });
    }
  };

  let v = {
    authInfo,
    logOut: logOut,
    logIn: logIn,
    signUp: signUp,
    initialize,
  };

  return <AuthContext.Provider value={v} {...props} />;
};

export const useAuth = () => React.useContext(AuthContext);