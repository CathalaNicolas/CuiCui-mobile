import React, { useEffect, Suspense } from "react";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonLoading,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
// Auth
import { useAuth } from "./auth/authContext";

const App: React.FC = () => {
  const { authInfo, initialize } = useAuth()!;

  useEffect(() => {
    (async () => await initialize())();
  }, []);

  if (!authInfo || !authInfo.initialized) {
    return (
      <IonApp>
        <IonLoading isOpen={true} />
      </IonApp>
    );
  } else {
    return (
      <Suspense fallback={null}>
        <IonApp>
          <>
            {authInfo?.loggedIn === true ? (
              <IonReactRouter>
                <IonRouterOutlet id="main">
                  <Route path="/home" component={Home} />
                  <Redirect from="/" to="/home" exact />
                </IonRouterOutlet>
              </IonReactRouter>
            ) : (
                <IonReactRouter>
                  <Route
                    path="/signup"
                    component={Signup}
                    exact
                  />
                  <Route path="/login" component={Login} exact />
                  <Redirect from="/" to="/login" exact />
                </IonReactRouter>
              )}
          </>
        </IonApp>
      </Suspense>
    );
  }
};

export default App;

