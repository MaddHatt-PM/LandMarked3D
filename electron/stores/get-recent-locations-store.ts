import { DataStore } from './datastore';

const getRecentLocationsStore = () => {
  return new DataStore({
    filename: 'recent-locations',
    defaultState: {
      recentLocations: []
    }
  });
};

interface RecentLocation {
  name: string,
  filepath: string
}

const recentLocationsKey = "recentLocations"

export const pushNewLocation = (newLocation: RecentLocation) => {
  const store = getRecentLocationsStore();

  let recentLocations = store.get(recentLocationsKey) as RecentLocation[];
  recentLocations = recentLocations.filter(o => o.filepath === newLocation.filepath)
  recentLocations = [newLocation, ...recentLocations];

  store.set(recentLocationsKey, recentLocations);
  console.log(recentLocations)
}

export const getRecentLocations = () => {
  return getRecentLocationsStore().get(recentLocationsKey);
}

export const clearRecentProjects = () => {
  getRecentLocationsStore().set(recentLocationsKey, []);
}