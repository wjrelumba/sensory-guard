import { highWarningNotification, normalWarningNotification } from "./NotificationFunctions";

export const notifierLogic = (
    dataValue, // Reading Value
    thresholdValue, // Threshold Value
    protoId, // Prototype ID
    protoName, // Prototype Name
    mode, // Temperature || Humidity
) => {
    const capitalizeFirstLetter = (word) => {
        if (!word) return ''; // handle empty or undefined input
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    };

    if(dataValue > thresholdValue.danger.high){
        highWarningNotification(`${mode.toUpperCase()}`, `${capitalizeFirstLetter(mode)} reached DANGER Levels`, protoId, protoName, mode);
    }
    else if(dataValue > thresholdValue.high.high){
        highWarningNotification(`${mode.toUpperCase()}`, `${capitalizeFirstLetter(mode)} exceeded HIGH threshold`, protoId, protoName, mode);
    }
    else if(dataValue > thresholdValue.normal.high){
        normalWarningNotification(`${mode.toUpperCase()}`, `${capitalizeFirstLetter(mode)} exceeded NORMAL threshold`, protoId, protoName, mode);
    }
}

export const flameVibrationNotifierLogic = (
    dataValue, // Reading Value
    thresholdValue, // Threshold Value
    protoId, // Prototype ID
    protoName, // Prototype Name
    mode, // Temperature || Humidity
) => {

    const capitalizeFirstLetter = (word) => {
        if (!word) return ''; // handle empty or undefined input
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    };

    if(dataValue > thresholdValue.allowed){
        highWarningNotification(`${mode.toUpperCase()}`, `${capitalizeFirstLetter(mode)} DETECTED!`, protoId, protoName, mode);
    }
}

export const smokeGasNotifierLogic = (
    dataValue, // Reading Value
    thresholdValue, // Threshold Value
    protoId, // Prototype ID
    protoName, // Prototype Name
    mode, // Temperature || Humidity
) => {

    const capitalizeFirstLetter = (word) => {
        if (!word) return ''; // handle empty or undefined input
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    };

    const replaceUnderscores = (str) => {
        return str.replace(/_/g, ' & ');
    }

    if(dataValue > thresholdValue.threshold){
        highWarningNotification(`${mode.toUpperCase()}`, `${replaceUnderscores(capitalizeFirstLetter(mode))} exceeded allowed threshold!`, protoId, protoName, mode);
    }
}