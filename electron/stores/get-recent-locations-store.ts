import { DataStore } from './datastore';

const getLocationStore = () => {
  return new DataStore({
    filename: 'recent-locations',
    defaultState: {
      recentLocations: []
    }
  });
};

export interface RecentLocation {
  name: string,
  filepath: string
}

const recentLocationsKey = "recentLocations"

export const push = (newLocation: RecentLocation) => {
  const store = getLocationStore();

  let recents = store.get(recentLocationsKey) as RecentLocation[];
  recents = recents.filter(o => o.filepath === newLocation.filepath)
  recents = [newLocation, ...recents];
  console.log(recents)

  recents = recents.reduce((unique: any, o: any) => {
    if (!unique.some((obj: RecentLocation) => obj.name === o.name && obj.filepath === o.filepath)) {
      unique.push(o);
    }
    return unique;
  }, []);

  store.set(recentLocationsKey, recents);
  console.log(recents)
}


export const getAll = () => {
  let recents = getLocationStore().get(recentLocationsKey) as RecentLocation[];
  // recents = recents.reduce((unique:any, o: any) => {
  //   if (!unique.some((obj: RecentLocation) => obj.name === o.name && obj.filepath === o.filepath)) {
  //     unique.push(o);
  //   }
  //   return unique;
  // }, []);
  console.log(recents)
  return recents;
}

export const remove = (filepath: string) => {
  const store = getLocationStore();
  let recents = store.get(recentLocationsKey) as RecentLocation[];
  recents = recents.filter(o => o.filepath !== filepath);
  store.set(recentLocationsKey, recents);
}

export const clear = () => {
  getLocationStore().set(recentLocationsKey, []);
}