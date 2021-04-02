import { IonContent, IonHeader, IonFooter, IonIcon, IonPage, IonChip, IonFabList, IonMenu, IonList, IonFab, IonFabButton, IonTitle, IonLabel, IonItem, IonImg, IonThumbnail, IonTextarea, IonSelectOption, IonSelect, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonButton, IonText, useIonViewDidEnter, getPlatforms } from '@ionic/react';
import { powerOutline, settingsOutline, personOutline, cameraOutline, documentOutline, micOutline, repeatOutline, languageSharp, powerSharp } from 'ionicons/icons';
import axios from "axios";
import { isPlatform } from '@ionic/react';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { useEffect, useState, useRef } from 'react';
import { RouteComponentProps } from "react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from '../auth/authContext';
import SelectLang, { LangInterface, tagToLang, _langs } from '../components/SelectLang';
import './Home.css';
import { Capacitor, FilesystemDirectory } from "@capacitor/core";
import { usePhotoGallery, Photo } from '../hooks/usePhotoGallery';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { platform } from 'node:os';

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { deleteFile, readFile, writeFile } = useFilesystem();
  const [permMic, setPermMic] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>();
  const [textOutput, setTextOutput] = useState<string>();
  const { t, i18n } = useTranslation(['translate']);
  const [selectedSourceLang, setSelectedSourceLang] = useState<LangInterface>(_langs[0]);
  const [selectedTargetLang, setSelectedTargetLang] = useState<LangInterface>(_langs[1]);
  const [selectedAppLang, setSelectedAppLang] = useState<LangInterface>(tagToLang(i18n.language));
  const { authInfo, logOut } = useAuth()!;
  const speechRecognition = new SpeechRecognition();
  const fileChooser = new FileChooser();
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();
  const inputFile = useRef(null);
  const [docFile, setDocFile] = useState<any>();

  const handleTextTrad = async () => {
    if (textInput && textInput !== "") {
      const trad = {
        sourceLang: selectedSourceLang.tag,
        targetLang: selectedTargetLang.tag,
        text: textInput,
      }
      axios.post('https://cuicui-back.herokuapp.com/translate/text', trad, {
        headers: {
          'Authorization': `Bearer ${authInfo.user.token}`,
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        setTextOutput(res.data.data.text);
      }).catch((res) => {
      })
    }
  }

  useIonViewDidEnter(() => {
    speechRecognition.isRecognitionAvailable().then(
      () => {
        speechRecognition.requestPermission().then(() => setPermMic(true)
        );
      },
      () => {
        console.log('Microphone unhandled on web version')
      })
  });

  const handleSelectTargetLang = async (lang: LangInterface) => {
    setSelectedTargetLang(lang);
  }
  const handleSelectSourceLang = async (lang: LangInterface) => {
    setSelectedSourceLang(lang);
  }

  const handleSelectAppLang = async (lang: LangInterface) => {

    await i18n.changeLanguage(lang.tag.toLowerCase());
    setSelectedAppLang(lang);
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

  const handleSpeechRecognition = async () => {
    const options = {
      language: selectedAppLang.fullTag
    }
    if (permMic === true) {
      speechRecognition.startListening(options).subscribe(
        (matches: Array<string>) => { setTextInput(matches[0]); },
        (onerror) => console.log('error:', onerror)
      )
    }
  }

  const handlePhotoTrad = async () => {
    await takePhoto();

    const file = await readFile({
      path: Capacitor.convertFileSrc(photos[0].filepath),
      directory: FilesystemDirectory.Data
    });

    const params = {
      sourceLang: selectedSourceLang.tag,
      targetLang: selectedTargetLang.tag,
      photo: file.data,
    }

    axios.post('http://localhost:8080/translate/photo', params, {
      headers: {
        'Authorization': `Bearer ${authInfo.user.token}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      setTextInput(res.data.data.text);
      deletePhoto(photos[0])
    }).catch((error) => {
      console.log(error);
      deletePhoto(photos[0])
    })
  }

  const handleDocTrad = () => {
    if (isPlatform('hybrid')) {
      fileChooser.open().then((res) => {
        console.log(res)
      });
    } else {
      if (inputFile !== null && inputFile.current !== null) {
        // @ts-ignore: Object is possibly 'null'.
        inputFile.current.click();
      }
    }
  }

  function onDocChange(event: any) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    
    console.log(file);
    setDocFile(file);

    var form = new FormData();

    form.append('file', file);
    form.append('target_lang', selectedTargetLang.tag)
    form.append('source_lang', selectedSourceLang.tag)

    axios.post('http://localhost:8080/translate/document', form, {
      headers: {
        'Authorization': `Bearer ${authInfo.user.token}`,
        'Content-Type': 'multipart/form-data;boundary="boundary"'
      }
    }).then((res) => {
      setTextOutput(res.data.data.text);
    })
  }
  if (!authInfo) {
    history.push('/login')
    return (null);
  }

  return (
    <IonPage>
      <IonToolbar style={{ "--background": "#ffb638" }}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <SelectLang appLang={selectedAppLang} selectedLang={selectedAppLang} setLang={handleSelectAppLang} />
            </IonCol>
            <IonCol>
              <IonFab vertical="center" horizontal="end" edge>
                <IonFabButton size="small">
                  <IonIcon icon={powerOutline} onClick={handleLogOut} />
                </IonFabButton>
              </IonFab>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
      <IonContent style={{ "--background": "#ffdb9c", "height": "100%" }} >
        {
          speechRecognition.isRecognitionAvailable() &&
          <IonFab vertical="top" horizontal="start" aria-disabled={permMic === true ? "false" : "true"}>
            <IonFabButton size="small" disabled={!permMic}>
              <IonIcon icon={micOutline} onClick={handleSpeechRecognition} />
            </IonFabButton>
          </IonFab>
        }
        <IonGrid style={{ "height": "100%" }}>
          <IonRow style={{ "height": "5%", "justifyContent": "center", "marginBottom": "5px" }}>
            <IonCol size="auto">
              <SelectLang appLang={selectedAppLang} selectedLang={selectedSourceLang} setLang={handleSelectSourceLang} />
            </IonCol>
          </IonRow>
          <IonRow style={{ "height": "40%" }}>
            <IonCol style={{ "height": "100%" }} >

              <IonCard style={{ "--background": "#fef5e6", "height": "100%" }} >
                <IonCardContent style={{ "height": "100%" }} >
                  <IonItem lines="none" style={{ "--background": "#fef5e6", "height": "100%" }} >
                    <IonTextarea style={{ "height": "100%" }} value={textInput}
                      onIonChange={e => setTextInput(e.detail.value!)}></IonTextarea>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow style={{ "height": "5%", "marginBottom": "5px", "justifyContent": "center" }}></IonRow>
          <IonRow style={{ "height": "40%", "marginBottom": "5px" }}>
            <IonCol style={{ "height": "100%" }}>
              <IonCard style={{ "--background": "#fef5e6", "height": "100%" }} >
                <IonCardContent style={{ "height": "100%" }} >
                  <IonItem lines="none" style={{ "--background": "#fef5e6", "height": "100%" }}  >
                    <IonTextarea style={{ "height": "100%" }} value={textOutput} disabled></IonTextarea>
                  </IonItem>

                </IonCardContent>
              </IonCard>

            </IonCol>
          </IonRow>
          <IonRow style={{ "height": "5%", "justifyContent": "center" }}>
            <IonCol size="auto">
              <SelectLang appLang={selectedAppLang} selectedLang={selectedTargetLang} setLang={handleSelectTargetLang} />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonFab vertical="center" horizontal="center" edge>
          <IonFabButton onClick={handleTextTrad}>
            <IonIcon icon={repeatOutline} />
          </IonFabButton>
        </IonFab>
        <IonFab vertical="center" horizontal="start" edge>
          <IonFabButton onClick={handlePhotoTrad}>
            <IonIcon icon={cameraOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
        {isPlatform('hybrid') &&
          <IonFab vertical="center" horizontal="end" edge>
            <IonFabButton onClick={handleDocTrad}>
              <IonIcon icon={repeatOutline} />
            </IonFabButton>
          </IonFab>
        }
        {isPlatform('mobileweb') &&
          <IonFab vertical="center" horizontal="end" edge>
            <IonFabButton onClick={handleDocTrad}>
              <IonIcon icon={documentOutline} />
              <input type='file' id='file' ref={inputFile} onChange={onDocChange.bind(this)} style={{ display: 'none' }} />
            </IonFabButton>
          </IonFab>
        }
      </IonContent>
    </IonPage >
  );
};
export default Home;