const url = {
  prod: "https://intouchapis.azure-api.net/api/analytics/place-assets",
  stg: "https://stg-intouchapis.azure-api.net/api/analytics/place-assets",
};

export const getPlacesAssets = async (env, user) => {
  const Authorization = `Basic ${btoa(`${user.username}@${user.password}`)}`;
  return (
    await fetch(url[env], {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.sk,
        Authorization,
      },
    })
  ).json();
};
