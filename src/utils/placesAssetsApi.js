const url = {
  prod: "https://intouchapis.azure-api.net/api/analytics/place-assets",
  stg: "https://stg-intouchapis.azure-api.net/api/4n4lytics/place-assets",
};

const skMap = {
  prod: process.env.sk,
  stg: process.env.sks,
};

export const getPlacesAssets = async (env, user) => {
  const Authorization = `Basic ${btoa(`${user.username}@${user.password}`)}`;
  return (
    await fetch(url[env], {
      headers: {
        "Ocp-Apim-Subscription-Key": skMap[env],
        Authorization,
      },
    })
  ).json();
};
