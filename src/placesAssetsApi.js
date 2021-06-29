const url = {
  prod: "https://intouchapis.azure-api.net/api/4n4lytics/place-assets",
  stg: "https://stg-intouchapis.azure-api.net/api/4n4lytics/place-assets",
};

export const getPlacesAssets = async (env,key) => {
  const Authorization =  `Basic ${btoa(key)}`;
  return await (await fetch(url[env],{headers:{
    "Ocp-Apim-Subscription-Key":"b21661c1e9f14136aff76eb2fec8580e",
    Authorization
  }})).json()
}
