import { Config, Region, LivePreview, Stack } from "contentstack";
const {
  VITE_REACT_APP_CONTENTSTACK_API_KEY,
  VITE_REACT_APP_CONTENTSTACK_DELIVERY_TOKEN,
  VITE_REACT_APP_CONTENTSTACK_ENVIRONMENT,
  VITE_REACT_APP_CONTENTSTACK_BRANCH,
  VITE_REACT_APP_CONTENTSTACK_REGION,
  VITE_REACT_APP_CONTENTSTACK_PREVIEW_TOKEN,
  VITE_REACT_APP_CONTENTSTACK_APP_HOST,
  VITE_REACT_APP_CONTENTSTACK_LIVE_PREVIEW,
  VITE_REACT_APP_CONTENTSTACK_PREVIEW_HOST
} = import.meta.env;
// basic env validation
export const isBasicConfigValid = () => {
  return (
    !!VITE_REACT_APP_CONTENTSTACK_API_KEY &&
    !!VITE_REACT_APP_CONTENTSTACK_DELIVERY_TOKEN &&
    !!VITE_REACT_APP_CONTENTSTACK_ENVIRONMENT
  );
};
// Live preview config validation
export const isLpConfigValid = () => {
  return (
    !!VITE_REACT_APP_CONTENTSTACK_LIVE_PREVIEW &&
    !!VITE_REACT_APP_CONTENTSTACK_PREVIEW_TOKEN &&
    !!VITE_REACT_APP_CONTENTSTACK_PREVIEW_HOST &&
    !!VITE_REACT_APP_CONTENTSTACK_APP_HOST
  );
};
// set region
const setRegion = (): Region => {
  let region = "US" as keyof typeof Region;
  if (!!VITE_REACT_APP_CONTENTSTACK_REGION && VITE_REACT_APP_CONTENTSTACK_REGION !== "us") {
    region = VITE_REACT_APP_CONTENTSTACK_REGION.toLocaleUpperCase().replace(
      "-",
      "_"
    ) as keyof typeof Region;
  }
  return Region[region];
};
// set LivePreview config
const setLivePreviewConfig = (): LivePreview => {
  if (!isLpConfigValid())
    throw new Error("Your LP config is set to true. Please make you have set all required LP config in .env");
  return {
    preview_token: VITE_REACT_APP_CONTENTSTACK_PREVIEW_TOKEN as string,
    enable: VITE_REACT_APP_CONTENTSTACK_LIVE_PREVIEW as string === "true",
    host: VITE_REACT_APP_CONTENTSTACK_PREVIEW_HOST as string,
  } as LivePreview;
};
// contentstack sdk initialization
export const initializeContentStackSdk = (): Stack => {
  if (!isBasicConfigValid())
    throw new Error("Please set you .env file before running starter app");
  const stackConfig: Config = {
    api_key: VITE_REACT_APP_CONTENTSTACK_API_KEY as string,
    delivery_token: VITE_REACT_APP_CONTENTSTACK_DELIVERY_TOKEN as string,
    environment: VITE_REACT_APP_CONTENTSTACK_ENVIRONMENT as string,
    region: setRegion(),
    branch: VITE_REACT_APP_CONTENTSTACK_BRANCH || "main",
  };
  if (VITE_REACT_APP_CONTENTSTACK_LIVE_PREVIEW === "true") {    
    stackConfig.live_preview = setLivePreviewConfig();
  }
  return Stack(stackConfig);
};
// api host url
export const customHostUrl = (baseUrl=''): string => {
  return baseUrl.replace("api", "cdn");
};
// generate prod api urls
export const generateUrlBasedOnRegion = (): string[] => {
  return Object.keys(Region).map((region) => {
    if (region === "US") {
      return `cdn.contentstack.io`;
    }
    return `${region}-cdn.contentstack.com`;
  });
};
// prod url validation for custom host
export const isValidCustomHostUrl = (url: string): boolean => {
  return url ? !generateUrlBasedOnRegion().includes(url) : false;
};






