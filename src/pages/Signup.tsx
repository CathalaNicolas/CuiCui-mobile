import { IonContent, IonHeader, IonPage, IonTitle, IonChip, IonImg, IonSelect, IonSelectOption, IonText, IonGrid, IonInput, IonItem, IonToast, IonItemDivider, IonList, IonButton, IonFooter, IonCard, IonCardHeader, IonCardContent, IonCol, IonRow } from '@ionic/react';
import { useState } from 'react';
import { useAuth } from "../auth/authContext";
import { RouteComponentProps } from "react-router";
import { sourceLang, compareWith, tagToLang } from '../theme/languages';
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Input, { InputProps } from "../components/Input";
import { object, string } from "yup";
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

  const validationSchema = object().shape({
    email: string().required().email(),
    username: string().required().min(5).max(32),
    password: string().required().min(8),
    confirmPassword: string().required().min(8)
  });

  const { control, handleSubmit, errors } = useForm({
    validationSchema,
  });

  const formFields: InputProps[] = [
    {
      name: "email",
      component: <IonInput type="email" />,
      label: t("translate:email"),
    },
    {
      name: "username",
      component: <IonInput type="text" />,
      label: t("translate:username"),
    },
    {
      name: "password",
      component: <IonInput type="password" clearOnEdit={false} />,
      label: t("translate:password"),
    },
    {
      name: "confirmPassword",
      component: <IonInput type="password" clearOnEdit={false} />,
      label: t("translate:confirmPassword"),
    },
  ];

  const registerUser = async (data: any) => {
    console.log(data);
    if (data.password === data.passwordConfirm) {
      signUp(data.username, data.email, data.password).then((res) => {
        logIn(data.email, data.password).then((res) => {
          history.replace('/home');
        }).catch((err) => {
          setError(t("translate:error:login"))
          setShowError(true);
        })
      }).catch((err) => {
        console.log(err.error.message);
        setShowError(true);
      })
    }
    else {
      setError(t("translate:error:confirmPassword"));
      setShowError(true);
    }
  }

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
                  {formFields.map((field, index) => (
                    <Input {...field} control={control} key={index} errors={errors} />
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonToast
              isOpen={showError}
              onDidDismiss={() => setShowError(false)}
              message={error}
              duration={1000}
            />
          </IonRow>
        </IonGrid>
        <IonButton expand="block" onClick={handleSubmit(registerUser)} >{t("translate:signUp:register")} </IonButton>
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