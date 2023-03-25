import { DataStore } from "../systems/datastore";
// import { ApiBaseProps, ApiFunctions, GetDataFromPoint, GetImageryFromRect } from "./APIBase";

import crypto = require("crypto");
import { APIFunctionality, APIProps } from "../types/APIDetails";


const crytpoStore = new DataStore({
  filename: 'api-keys',
  defaultState: {
    key: crypto.randomBytes(32),
    iv: crypto.randomBytes(16),
  }
});

const aesAlgorithm = 'aes-256-cbc';

const apiKeyStore = new DataStore({
  filename: 'api-keys',
  defaultState: {}
});

if (crytpoStore.wasReInitialized) {
  apiKeyStore.reset();
}

export class ApiBase implements APIFunctionality {
  props: APIProps;

  constructor(props: APIProps) {
    this.props = props;
  }

  canGetDataFromPoint = () => {
    return this.props.getDataFromPoint.length !== 0;
  };

  canGetImageryFromRect = () => {
    return this.props.getImageryFromRect.length !== 0;
  };

  setKey(apiKey: string): void {
    const cryptoKey = crytpoStore.get("key") as string;
    const cryptoIV = crytpoStore.get("iv") as string;

    let cipher = crypto.createCipheriv(aesAlgorithm, cryptoKey, cryptoIV);
    let encryptedAPIKey = cipher.update(apiKey);
    encryptedAPIKey = Buffer.concat([encryptedAPIKey, cipher.final()]);

    const keyName = this.props.name.replace(/\W/g, ''); // Make alphanumeric
    apiKeyStore.set(keyName, encryptedAPIKey)
    apiKeyStore.set(keyName + "_iv", cryptoIV)
  }

  getKey(): string | undefined {
    // const keyName = this.props.name.replace(/\W/g, ''); // Make alphanumeric
    // const encryptedAPIKey = apiKeyStore.get(keyName);
    // const hexIV = apiKeyStore.get(keyName + "_iv");

    // let iv = Buffer.from(hexIV as string, 'hex');


    // let encryptedText = Buffer.from(text.encryptedData, 'hex');
    // let decipher = crypto.createDecipheriv(aesAlgorithm, Buffer.from(key), iv);
    // let decrypted = decipher.update(encryptedText);
    // decrypted = Buffer.concat([decrypted, decipher.final()]);
    // return decrypted.toString();
    return "todo"
  }
}