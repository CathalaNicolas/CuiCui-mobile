import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet } from '@ionic/react';

export const Menu: React.FC = () => {

  return (
    <IonMenu side="end" type="push">
    <IonHeader>
      <IonToolbar color="danger">
        <IonTitle>End Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
      </IonList>
    </IonContent>
    
  </IonMenu>
  );
};