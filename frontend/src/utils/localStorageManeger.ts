/* eslint-disable @typescript-eslint/no-explicit-any */
export const readLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string);
};

export const setLocalStorage = (key: string, data: any) => {
  const stringfyData = JSON.stringify(data);
  localStorage.setItem(key, stringfyData);
};
