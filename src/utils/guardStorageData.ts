export const guardStorageData = (data: string | null) => {
  if(data !== null) return JSON.parse(data);
};
