export const getPlacesAssets = async (key) => {
  const Authorization =  `Basic ${btoa(key)}`;
  return await (await fetch("https://dev-intouchapis.azure-api.net/api/4n4lytics/place-assets",{headers:{
    "Ocp-Apim-Subscription-Key":"b21661c1e9f14136aff76eb2fec8580e",
    Authorization
  }})).json()
}
