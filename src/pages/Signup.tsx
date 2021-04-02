import { IonContent, IonHeader, IonPage, IonTitle, IonChip, IonImg, IonSelect, IonSelectOption, IonText, IonGrid, IonInput, IonItem, IonToast, IonItemDivider, IonList, IonButton, IonFooter, IonCard, IonCardHeader, IonCardContent, IonCol, IonRow } from '@ionic/react';
import { useState } from 'react';
import { useAuth } from "../auth/authContext";
import SelectLang, { LangInterface, tagToLang, _langs } from '../components/SelectLang';
import { RouteComponentProps } from "react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Input, { InputProps } from "../components/Input";
import { object, string } from "yup";
import "../translations/i18n";
import './Signup.css';


const Signup: React.FC<RouteComponentProps> = ({ history }) => {
  const [error, setError] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);
  let { logIn, signUp } = useAuth()!;
  const { t, i18n } = useTranslation(['translate']);
  const [selectedAppLang, setSelectedAppLang] = useState<LangInterface>(tagToLang(i18n.language));

  const validationSchema = object().shape({
    email: string().required().email(),
    username: string().required().min(5).max(32),
    password: string().required().min(8)
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
    }
  ];

  const handleSelectAppLang = async (lang: LangInterface) => {
    setSelectedAppLang(lang);
    i18n.changeLanguage(lang.tag.toLowerCase());
  }
  const registerUser = async (data: any) => {
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

  return (
    <IonPage>
      <IonHeader style={{ "--background": "#ffdb9c" }}>
        <IonTitle>Cui Cui</IonTitle>
      </IonHeader>
      <IonContent style={{ "--background": "#ffdb9c" }}>
        <IonGrid>
          <IonRow style={{ "justifyContent": "flex-end" }}>
            <IonCol size="auto">
              <SelectLang appLang={selectedAppLang} selectedLang={selectedAppLang} setLang={handleSelectAppLang} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCard style={{ "width": "100%", "--background": "#fef5e6" }}>
              <IonCardHeader>
              </IonCardHeader>
              <IonCardContent>
                {formFields.map((field, index) => (
                  <Input {...field} control={control} key={index} errors={errors} />
                ))}
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
      <IonFooter style={{ "--background": "#ffdb9c" }}>
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