/* eslint-disable @typescript-eslint/no-explicit-any */
const getData = (key: string): any => localStorage.getItem(key);

export const clearUserData = () => localStorage.removeItem('DRAWING_STATION_USER');

export const readLocalStorage = (key: string): any => JSON.parse(getData(key));


export const setLocalStorage = (key: string, data: any) => {
  const stringfyData = JSON.stringify(data);
  localStorage.setItem(key, stringfyData);
};
