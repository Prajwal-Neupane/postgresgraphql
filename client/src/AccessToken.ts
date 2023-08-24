let accessToken = "";

export const setAccessToken = (token: string | any) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};
