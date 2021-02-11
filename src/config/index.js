/* eslint-disable no-underscore-dangle */

const getConfig = (key, attempts = 0) => {
  const HAS_ENV = !!window && !!window._env;

  const MAX_ATTEMPTS = 20; // 5 seconds of checking given that the timeout ms is 250
  const NOT_MAXED_OUT_ATTEMPTS = attempts < MAX_ATTEMPTS;
  const TIME_OUT_MS = 250;

  if (HAS_ENV) {
    return window._env[key] || "Item not found";
  }

  if (NOT_MAXED_OUT_ATTEMPTS) {
    window.setTimeout(() => getConfig(key, attempts + 1), TIME_OUT_MS);
  }

  return "Window or Window Env not found";
};

const types = {
  apiUrl: "REACT_APP_API_URL",
  domain: "REACT_APP_DOMAIN",
  clientId: "REACT_APP_CLIENT_ID",
  newRelicKey: "REACT_APP_NEW_RELIC_KEY:",
  bluePrintUrl: "REACT_APP_BLUE_PRINT_URL",
  env: "REACT_APP_ENV",
  fieldNetUrl: "REACT_APP_FIELD_NET_URL",
  launchDarkly: "REACT_APP_LAUNCH_DARKLY_ID",
};

export { getConfig, types };
