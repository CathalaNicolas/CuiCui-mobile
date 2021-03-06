import React, { FC } from "react";
import { IonItem, IonLabel, IonInput, IonText } from "@ionic/react";
import {
  Controller,
  Control,
  NestDataObject,
  FieldError,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface InputProps {
  name: string;
  control?: Control;
  label?: string;
  component?: JSX.Element;
  errors?: NestDataObject<Record<string, any>, FieldError>;
}

const Input: FC<InputProps> = ({ name, control, component, label, errors }) => {
  const { t } = useTranslation(['translate']);

  const handleErrorTrad = () => {
    if (errors && errors[name].type === "required") {
      return t('translate:error:requiredField');
    }
    else if (errors && errors[name].type === "min") {
      return t('translate:error:lengthMin');
    }
    else if (errors && errors[name].type === "max") {
      return t('translate:error:lengthMax');
    }
    else if (errors && errors[name].type === "email") {
      return t('translate:error:emailValid');
    }
    return ;
  }
  
  return (
    <>
      <IonItem style={{ "--background": "#fef5e6" }}>
        {label && <IonLabel position="floating">{label}</IonLabel>}
        <Controller
          as={
            component ?? (
              <IonInput
                aria-invalid={errors && errors[name] ? "true" : "false"}
                aria-describedby={`${name}Error`}
              />
            )
          }
          name={name}
          control={control}
          onChangeName="onIonChange"
        />
      </IonItem>
      {errors && errors[name] && (
        <IonText color="danger" className="ion-padding-start">
          <small>
            <span role="alert" id={`${name}Error`}>
              {handleErrorTrad()}
            </span>
          </small>
        </IonText>
      )}
    </>
  );
};

export default Input;