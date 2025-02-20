import React from "react";
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";

import {Controller, useForm} from "react-hook-form";
import {personCircle} from "ionicons/icons";
import {z} from "zod";
import './Login.css'
import {zodResolver} from "@hookform/resolvers/zod";


const loginSchema = z.object({
    phoneNumber: z.string().regex(/^(0)?9\d{9}$/, 'Invalid phone number'),
    password: z.string().min(6, 'Invalid password'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const {control, handleSubmit, formState: {errors}} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });
    
    const onSubmit = (data: LoginFormData) => {
        console.log('Login data:', data);
    };
    
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            
            <IonContent className="ion-padding">
                <div className={"login-logo"}>
                    <IonIcon
                        className={"login-logo__icon"}
                        icon={personCircle}
                    />
                    <p>Welcome To Your Home</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <IonItem>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({field}) => (
                                <IonInput
                                    {...field}
                                    value={field.value}
                                    onIonChange={(e) => field.onChange(e.detail.value)}
                                    label="Phone Number"
                                    labelPlacement="floating"
                                    type="tel"
                                    autocomplete="tel"
                                />
                            )}
                        />
                    </IonItem>
                    {errors.phoneNumber &&
                        <p className="log-er">{errors.phoneNumber.message}</p>}
                    <IonItem>
                        <Controller
                            name="password"
                            control={control}
                            render={({field}) => (
                                <IonInput
                                    {...field}
                                    value={field.value}
                                    onIonChange={(e) => field.onChange(e.detail.value)}
                                    label="Password"
                                    labelPlacement="floating"
                                    type="password"
                                    autocomplete="current-password"
                                />
                            )}
                        />
                    </IonItem>
                    {errors.password && <p className="log-er">{errors.password.message}</p>}
                    <IonButton expand="block" type="submit" className="login-button">
                        Login
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default Login;