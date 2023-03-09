const electron = require('electron')
const path = require('path');
const fs = require('fs')

interface DataStoreParameters {
  filename: string;
  defaultState: Record<string, unknown>;
}

export class DataStore {
  storePath: string;
  data: Record<string, unknown>;

  constructor({ filename, defaultState} : DataStoreParameters) {
    const remoteMain = require("@electron/remote/main");

    const userDataPath = (electron.app || remoteMain.app).getPath('userData');
    this.storePath = path.join(userDataPath, filename + '.json');
    this.data = parseDataFile(this.storePath, defaultState);
  }

  get(key:string) {
    return this.data[key];
  }

  set(key:string, val:unknown) {
    this.data[key] = val;
    fs.writeFileSync(this.storePath, JSON.stringify(this.data))
  }
}

function parseDataFile(filePath: string, defaults: Record<string, unknown>) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    return defaults;
  }
}