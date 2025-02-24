type LoadSettings = {
  path: string;
  local: boolean;
};

export default LoadSettings;

export const DEFAULT_SETTINGS: LoadSettings = {
  path: "cache.json",
  local: true,
};
