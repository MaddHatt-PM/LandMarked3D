import { DataStore } from './datastore';

const getPreferencesStore = () => {
  return new DataStore({
    filename: 'user-preferences',
    defaultState: {
      windowBounds: { x: 800, y: 300, width: 800, height: 600 },
      wasMaximized: false,
    }
  });
};

export default getPreferencesStore;