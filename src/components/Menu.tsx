import {IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle,} from '@ionic/react';

import {useLocation} from 'react-router-dom';
import {
    appsOutline,
    appsSharp,
    documentOutline,
    documentSharp,
    personCircleOutline,
    personCircleSharp
} from 'ionicons/icons';
import './Menu.css';
import React from "react";

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

const appPages: AppPage[] = [
    {
        title: 'Home Page',
        url: '/',
        iosIcon: personCircleOutline,
        mdIcon: personCircleSharp
    },
    {
        title: 'Category',
        url: '/category',
        iosIcon: appsOutline,
        mdIcon: appsSharp
    },
    {
        title: 'Products',
        url: '/products',
        iosIcon: documentOutline,
        mdIcon: documentSharp
    },
];


const Menu: React.FC = () => {
    const location = useLocation();

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader className="menu_header">Menu</IonListHeader>
                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === appPage.url ? 'selected' : ''}
                                         routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon}/>
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
