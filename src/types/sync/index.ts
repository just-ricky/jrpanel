export type SyncStartResponse = {
  error: boolean;
  message: string | undefined | null;
  code: string | undefined | null;
};

export type SyncCompleteResponse = {
  error: boolean;
  message: string | null | undefined;
};

export type UnsyncResponse = {
  error: boolean;
  message: string | null | undefined;
};
