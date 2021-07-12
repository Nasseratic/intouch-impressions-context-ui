const url = {
  prod: process.env.PLACES_ASSETS_URL,
  stg: process.env.STG_PLACES_ASSETS_URL,
};

const skMap = {
  prod: process.env.SUB_KEY,
  stg: process.env.STG_SUB_KEY,
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
