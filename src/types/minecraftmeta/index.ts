export type MinecraftMeta = {
  code: string;
  message: string;
  data: {
    player: {
      meta: {
        name_history: [{ name: string }];
      };
      username: string;
      id: string;
      raw_id: string;
      avatar: string;
    };
  };
};
