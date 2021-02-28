import { IonContent, IonHeader, IonFooter, IonPage, IonChip, IonGrid, IonRow, IonCol, IonLabel, IonSelect, IonSelectOption, IonImg, IonTitle, IonToast, IonInput, IonItem, IonItemDivider, IonList, IonButton, IonCard, IonCardHeader, IonCardContent, IonText } from '@ionic/react';
import { useState } from 'react';
import { useAuth } from "../auth/authContext";
import { sourceLang, compareWith, tagToLang } from '../theme/languages';
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import { RouteComponentProps } from "react-router";
import './Login.css';

type SourceLang = typeof sourceLang[number];

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  let { authInfo, logIn } = useAuth()!;
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const { t, i18n } = useTranslation(['translate']);
  const [showError, setShowError] = useState<boolean>(false);
  const [selectedAppLang, setSelectedAppLang] = useState<SourceLang>(tagToLang(i18n.language));

  return (
    <IonPage>
      <IonHeader>
        <IonTitle>Cui Cui</IonTitle>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow style={{ "justifyContent": "flex-end" }}>
            <IonCol size="auto">
              <IonChip color="primary">
                <IonImg src={selectedAppLang.img} style={{ "width": "30px" }} />
                <IonSelect compareWith={compareWith} value={selectedAppLang}
                  onIonChange={e => {
                    setSelectedAppLang(e.detail.value);
                    i18n.changeLanguage((e.detail.value.tag).toString().toLowerCase());
                  }}>
                  {sourceLang.map(lang => (
                    <IonSelectOption key={lang.id} value={lang}>
                      {t(`translate:${lang.lang}`)}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonChip>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                </IonCardHeader>
                <IonCardContent >
                  <IonList>
                    <IonItemDivider />
                    <IonItem >
                      <IonInput type="email" value={email} placeholder={t("translate:email")} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                    </IonItem >
                    <IonItemDivider />
                    <IonItem >
                      <IonInput type="password" value={password} placeholder={t("translate:password")} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                    </IonItem>

                  </IonList>
                </IonCardContent>
              </IonCard>
              <IonToast
                isOpen={showError}
                onDidDismiss={() => setShowError(false)}
                message={error}
                duration={1000}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButton style={{ "background": "#383a3e" }} expand="block" onClick={async () => {
          logIn(email, password).then((res) => {
            history.replace("/home");
          }).catch((err) => {
            setError(t("translate:error:login"))
            setShowError(true);
          });
        }}>{t("translate:login:connect")}</IonButton>
      </IonContent>
      <IonFooter>
        <IonList>
          <IonItem lines="none" button onClick={async () => { history.replace("/signup") }} slot="end">

            <IonText>{t("translate:login:notSub")}</IonText>
          </IonItem>
        </IonList>
      </IonFooter>
    </IonPage >
  );
};

export default Login;

