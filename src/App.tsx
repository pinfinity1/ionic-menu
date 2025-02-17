import React, {type ReactNode} from "react";
import {IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {Redirect, Route, RouteProps, Switch} from 'react-router-dom';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import useAccessToken from "./hooks/useAccessToken";
import {useStorageContext} from "./contexts/StorageContext";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Category from "./pages/Category";


setupIonicReact();


interface ProtectedRouteProps extends RouteProps {
    children: ReactNode
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, ...rest}) => {
    const {accessToken} = useAccessToken();
    
    return (
        <Route {...rest} render={({location}) =>
            accessToken ? (
                children
            ) : (
                <Redirect to={{pathname: "/login", state: {from: location}}}/>
            )
        }
        />
    );
};


const App: React.FC = () => {
    const {accessToken, loading} = useAccessToken();
    const {isStorageInitialized} = useStorageContext();
    
    
    if(loading || !isStorageInitialized) {
        return <div>Loading...</div>;
    }
    
    
    return (
        <IonApp>
            <IonReactRouter>
                <IonSplitPane contentId="main">
                    <IonRouterOutlet id="main">
                        <Switch>
                            <Route exact path="/login" render={() => (accessToken ? <Redirect to="/"/> : <Login/>)}/>
                            <ProtectedRoute exact path="/">
                                <Admin/>
                            </ProtectedRoute>
                            <ProtectedRoute exact path="/category">
                                <Category/>
                            </ProtectedRoute>
                            <ProtectedRoute exact path="/products">
                                <Products/>
                            </ProtectedRoute>
                            <Route path="*">
                                <Redirect to="/"/>
                            </Route>
                        </Switch>
                    </IonRouterOutlet>
                </IonSplitPane>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
