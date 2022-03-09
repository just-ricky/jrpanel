import useSWR from 'swr';

export const useMinecraftUser = () => {
  const { data, error } = useSWR(`/api/profile/get`);

  return {
    minecraftUser: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useMinecraftMeta = () => {
  const { minecraftUser, isLoading, isError } = useMinecraftUser();
  const { data, error } = useSWR(
    `/api/external/get-minecraft-meta?uuid=${minecraftUser?.minecraft?.uuid}`,
  );

  if (minecraftUser && minecraftUser?.minecraft?.uuid) {
    return {
      minecraftMeta: data,
      isLoading: !error && !data,
      isError: error,
    };

    // get username
  } else {
    return {
      minecraftMeta: null,
      isLoading: isLoading,
      isError: isError,
    };
  }
};

export const localStorageProvider = () => {
  // if the window hasn't loaded yet (SSR workaround)
  if (typeof window === `undefined`) {
    return new Map();
  }

  // when initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem(`app-cache`) || `[]`));

  // before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener(`beforeunload`, () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem(`app-cache`, appCache);
  });

  // w still use the map for write & read for performance.
  return map;
};
