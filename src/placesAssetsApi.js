const url = {
  prod: "https://intouchapis.azure-api.net/api/analytics/place-assets",
  stg: "https://stg-intouchapis.azure-api.net/api/analytics/place-assets",
};

export const getPlacesAssets = async (env,key) => {
  const Authorization =  `Basic ${btoa(key)}`;
  return await (await fetch(url[env],{headers:{
    "Ocp-Apim-Subscription-Key": process.env.sk,
    Authorization
  }})).json()
}
