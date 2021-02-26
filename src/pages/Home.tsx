import { IonContent, IonHeader, IonFooter, IonIcon, IonPage, IonChip, IonFabList, IonMenu, IonList, IonFab, IonFabButton, IonTitle, IonLabel, IonItem, IonImg, IonThumbnail, IonTextarea, IonSelectOption, IonSelect, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonButton, IonText } from '@ionic/react';
import { sourceLang, targetLang, compareWith } from '../theme/languages';
import { powerOutline, settingsOutline, personOutline, cameraOutline, documentOutline, micOutline, repeatOutline } from 'ionicons/icons';
import axios from "axios";
import { useState } from 'react';
import { RouteComponentProps } from "react-router";
import { useAuth } from '../auth/authContext';
import './Home.css';


type SourceLang = typeof sourceLang[number];
type TargetLang = typeof targetLang[number];

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const [textInput, setTextInput] = useState<string>();
  const [textOutput, setTextOutput] = useState<string>();
  const [selectedSourceLang, setSelectedSourceLang] = useState<SourceLang>(sourceLang[0]);
  const [selectedTargetLang, setSelectedTargetLang] = useState<TargetLang>(targetLang[1]);
  const { authInfo, logOut } = useAuth()!;

  const handleTextTrad = async () => {
    const trad = {
      sourceLang: selectedSourceLang,
      targetLang: selectedTargetLang,
      text: textInput,
    }
    axios.post('adrr', { trad }).then((res) => {
      setTextOutput(res.data.text);
    }).catch((res) => {

    })
  }

  const handleSwapLang = async () => {
    const tmp = selectedSourceLang;
    setSelectedSourceLang(selectedTargetLang);
    setSelectedTargetLang(tmp);
  }

  const handleLogOut = async () => {
    logOut();
    history.push('/login');
  }

  if (!authInfo) {
    history.push('/login')
    return (null);
  }

  return (
    <IonPage>
      <IonContent color="light" style={{ "height": "100%" }} >
        <IonGrid style={{ "height": "100%" }}>
          <IonRow style={{ "height": "5%" }}>
            <IonCol size="4">
              <IonFab vertical="center" horizontal="start" edge>
                <IonFabButton size="small">
                  <IonIcon icon={personOutline} />
                </IonFabButton>
                <IonFabList side="bottom">
                  <IonFabButton><IonIcon icon={settingsOutline} /></IonFabButton>

                  <IonFabButton onClick={handleLogOut}><IonIcon icon={powerOutline} /></IonFabButton>
                </IonFabList>
              </IonFab>
            </IonCol>
            <IonCol size="auto">
              <IonChip color="primary">
                <IonImg src={selectedSourceLang.img} style={{ "width": "30px" }} />
                <IonSelect compareWith={compareWith} value={selectedSourceLang}
                  onIonChange={e => setSelectedSourceLang(e.detail.value)}>
                  {sourceLang.map(lang => (
                    <IonSelectOption key={lang.id} value={lang}>
                      {lang.lang}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonChip>
            </IonCol>
          </IonRow>
          <IonRow style={{ "height": "40%" }}>
            <IonCol style={{ "height": "100%" }} >
              <IonCard style={{ "height": "100%" }} >
                <IonCardContent style={{ "height": "100%" }} >
                  <IonItem lines="none" style={{ "height": "100%" }} >
                    <IonTextarea style={{ "height": "100%" }} value={textInput}
                      onIonChange={e => setTextInput(e.detail.value!)}></IonTextarea>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow style={{ "height": "6%", "marginBottom": "5px", "justifyContent": "center" }}>
            <IonFabButton onClick={handleSwapLang}>
              <IonIcon icon={repeatOutline} />
            </IonFabButton>
          </IonRow>
          <IonRow style={{ "height": "40%", "marginBottom": "5px" }}>
            <IonCol style={{ "height": "100%" }}>
              <IonCard style={{ "height": "100%" }} >
                <IonCardContent style={{ "height": "100%" }} >
                  <IonItem lines="none" style={{ "height": "100%" }}  >
                    <IonTextarea style={{ "height": "100%" }} value={textOutput} disabled></IonTextarea>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow style={{ "height": "5%", "justifyContent": "center" }}>
            <IonCol size="auto">
              <IonChip color="primary" >
                <IonImg src={selectedTargetLang.img} style={{ "width": "30px" }} />
                <IonSelect compareWith={compareWith} value={selectedTargetLang}
                  onIonChange={e => setSelectedTargetLang(e.detail.value)}>
                  {targetLang.map(lang => (
                    <IonSelectOption key={lang.id} value={lang}>
                      {lang.lang}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonChip>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage >
  );
};

export default Home;
