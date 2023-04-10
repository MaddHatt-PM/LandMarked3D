import { DataStore } from './datastore';

const getRecentLocationsStore = () => {
  return new DataStore({
    filename: 'user-preferences',
    defaultState: {
      recentLocations: []
    }
  });
};

interface RecentLocation {
  name: string,
  filepath: string
}

export const pushNewLocation = (newLocation: RecentLocation) => {
  const store = getRecentLocationsStore();
  const key = "recentLocations";
  const recentLocations = store.get(key) as RecentLocation[];

  store.set(key, [newLocation, ...recentLocations]);
}

export const getRecentLocations = () => {
  return getRecentLocationsStore().get("recentLocations");
}
