import { IonContent, IonHeader, IonPage, IonTitle, IonChip, IonImg, IonSelect, IonSelectOption, IonText, IonGrid, IonInput, IonItem, IonToast, IonItemDivider, IonList, IonButton, IonFooter, IonCard, IonCardHeader, IonCardContent, IonCol, IonRow } from '@ionic/react';
import { useState } from 'react';
import { useAuth } from "../auth/authContext";
import { RouteComponentProps } from "react-router";
import { sourceLang, compareWith, tagToLang } from '../theme/languages';
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import './Signup.css';

type SourceLang = typeof sourceLang[number];

const Signup: React.FC<RouteComponentProps> = ({ history }) => {
  const [error, setError] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();
  let { authInfo, logIn, signUp } = useAuth()!;
  const { t, i18n } = useTranslation(['translate']);
  const [selectedAppLang, setSelectedAppLang] = useState<SourceLang>(tagToLang(i18n.language));


  return (
    <IonPage>
      <IonHeader>
        <IonTitle>Cui Cui</IonTitle>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow style={{ "justifyContent": "flex-end" }}>
            <IonCol size="auto">
              <IonChip color="primary">
                <IonImg src={selectedAppLang.img} style={{ "width": "30px" }} />
                <IonSelect compareWith={compareWith} value={selectedAppLang}
                  onIonChange={e => {
                    setSelectedAppLang(e.detail.value);
                    i18n.changeLanguage((e.detail.value.tag).toString().toLowerCase());
                    console.log(i18n.language)
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
            <IonCard style={{ "width": "100%" }}>
              <IonCardHeader>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  <IonItemDivider />
                  <IonItem>
                    <IonInput type="text" inputmode="text" value={username} placeholder={t("translate:username")} onIonChange={e => setUsername(e.detail.value!)}></IonInput>
                  </IonItem>
                  <IonItemDivider />
                  <IonItem>
                    <IonInput type="email" inputmode="email" value={email} placeholder={t("translate:email")} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                  </IonItem>
                  <IonItemDivider />
                  <IonItem>
                    <IonInput type="password" inputmode="text" value={password} placeholder={t("translate:password")} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonInput type="password" inputmode="text" value={passwordConfirm} placeholder={t("translate:confirmPassword")} onIonChange={e => setPasswordConfirm(e.detail.value!)}></IonInput>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonToast
              isOpen={showError}
              onDidDismiss={() => setShowError(false)}
              message={error}
              duration={400}
            />
          </IonRow>
        </IonGrid>
        <IonButton expand="block" onClick={async () => {
          if (password === passwordConfirm) {
            signUp(username, email, password).then((res) => {
              logIn(email, password).then((res) => {
                history.replace('/home');
              }).catch((err) => {
                setError(err.error.message)
                setShowError(true);
              })
            }).catch((err) => {
              setError(err.error.message)
              setShowError(true);
            })
          }
          else {
            setError('Erreur confirmation mot de passe');
            setShowError(true);
          }
        }}>{t("translate:signUp:subscribe")} </IonButton>
      </IonContent>
      <IonFooter>
        <IonList>
          <IonItem lines="none" button onClick={async () => {
            history.replace("/login")
          }}
            slot="end">

            <IonText>{t("translate:signUp:alreadySub")} </IonText>
          </IonItem>
        </IonList>
      </IonFooter>
    </IonPage>
  );
};

export default Signup;