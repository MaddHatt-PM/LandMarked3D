const electron = require('electron')
const path = require('path');
const fs = require('fs')

interface DataStoreProps {
  filename: string;
  defaultState: Record<string, unknown>;
}

export class DataStore {
  storePath: string;
  data: Record<string, unknown>;
  wasReInitialized: boolean;

  constructor({ filename, defaultState} : DataStoreProps) {
    const remoteMain = require("@electron/remote/main");
    
    const userDataPath = (electron.app || remoteMain.app).getPath('userData');
    this.storePath = path.join(userDataPath, filename + '.json');

    try {
      this.data = JSON.parse(fs.readFileSync(this.storePath));
      this.wasReInitialized = false; 

    } catch (error) {
      this.data = defaultState;
      this.wasReInitialized = true;
    }
    
  }

  get(key:string) {
    return this.data[key];
  }

  set(key:string, val:unknown) {
    this.data[key] = val;
    fs.writeFileSync(this.storePath, JSON.stringify(this.data))
  }

  reset() {
    fs.writeFileSync(this.storePath, JSON.stringify({}))
  }
}