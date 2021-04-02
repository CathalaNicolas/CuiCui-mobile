import { IonContent, IonHeader, IonFooter, IonPage, IonLoading, IonGrid, IonRow, IonCol, IonLabel, IonSelect, IonSelectOption, IonImg, IonTitle, IonToast, IonInput, IonItem, IonItemDivider, IonList, IonButton, IonCard, IonCardHeader, IonCardContent, IonText } from '@ionic/react';
import { useState } from 'react';
import { useAuth } from "../auth/authContext";
import SelectLang, { LangInterface, tagToLang } from '../components/SelectLang';
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import { RouteComponentProps } from "react-router";
import './Login.css';


const Login: React.FC<RouteComponentProps> = ({ history }) => {
  let { authInfo, logIn } = useAuth()!;
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const { t, i18n } = useTranslation(['translate']);
  const [showError, setShowError] = useState<boolean>(false);
  const [selectedAppLang, setSelectedAppLang] = useState<LangInterface>(tagToLang(i18n.language));
  const [showLoading, setShowLoading] = useState(false);

  const handleSelectAppLang = async (lang: LangInterface) => {
    setSelectedAppLang(lang);
    i18n.changeLanguage(lang.tag.toLowerCase());
  }

  return (
    <IonPage>
      <IonHeader>
        <IonTitle>Cui Cui</IonTitle>
      </IonHeader>
      <IonContent  style={{ "--background": "#ffdb9c" }}>
        <IonGrid>
          <IonRow style={{ "justifyContent": "flex-end" }}>
            <IonCol size="auto">
              <SelectLang appLang={selectedAppLang} selectedLang={selectedAppLang} setLang={handleSelectAppLang} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard style={{ "--background": "#fef5e6" }}>
                <IonCardHeader>
                </IonCardHeader>
                <IonCardContent >
                  <IonItemDivider style={{ "--background": "#fef5e6" }} />
                  <IonItem style={{ "--background": "#fef5e6" }} >
                    <IonInput type="email" value={email} placeholder={t("translate:email")} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                  </IonItem >
                  <IonItemDivider style={{ "--background": "#fef5e6" }} />
                  <IonItem style={{ "--background": "#fef5e6" }}>
                    <IonInput type="password" value={password} placeholder={t("translate:password")} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                  </IonItem>
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
          setShowLoading(true);
          logIn(email, password).then((res) => {
            setShowLoading(false);
            history.replace("/home");
          }).catch((err) => {
            setError(t("translate:error:login"))
            setShowError(true);
          });
          setShowLoading(false);
        }}>{t("translate:login:connect")}</IonButton>
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Please wait...'}
          duration={5000}
        />
      </IonContent>
      <IonFooter style={{ "--background": "#ffdb9c" }}>
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

