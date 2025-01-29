import React from "react";
import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";

import './Login.css'
import {personCircle} from "ionicons/icons";

const Login: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = () => {
        console.log('Phone Number:', phoneNumber);
        console.log('Password:', password);
        // Add your login logic here
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonGrid className="ion-padding" fixed>
                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">
                            <div className={"login-logo"}>
                                <IonIcon
                                    className={"login-logo__icon"}
                                    icon={personCircle}
                                />
                                <p>Welcome To Your Home</p>
                            </div>
                            <div className="login-container">
                                {/* Phone Number Input */}
                                <IonItem className="ion-margin-bottom">
                                    <IonInput
                                        label="Phone Number"
                                        labelPlacement="floating"
                                        type="tel"
                                        value={phoneNumber}
                                        placeholder="Enter your phone number"
                                        onIonChange={(e) => setPhoneNumber(e.detail.value!)}
                                    />
                                </IonItem>

                                {/* Password Input */}
                                <IonItem className="ion-margin-bottom">
                                    <IonInput
                                        label="Password"
                                        labelPlacement="floating"
                                        type="password"
                                        value={password}
                                        placeholder="Enter your password"
                                        onIonChange={(e) => setPassword(e.detail.value!)}
                                    />

                                </IonItem>

                                {/* Login Button */}
                                <IonButton
                                    expand="block"
                                    onClick={handleLogin}
                                    className="login-button"
                                >
                                    Login
                                </IonButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Login;