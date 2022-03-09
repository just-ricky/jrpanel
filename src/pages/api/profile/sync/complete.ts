import mcSyncCache, { SyncResponse } from '@/cache/mc-sync-cache';
import { connect } from '@/database/database';

connect();

const handler = async (req: any, res: any) => {
  // get code in request params
  const code: string = req.query.code;
  // get uuid in request params
  const uuid: string = req.query.uuid;

  if (code === undefined || uuid === undefined) {
    return res
      .status(400)
      .send({ error: true, message: `missing code or uuid` });
  }

  // try to sync
  const syncResposne: SyncResponse = await mcSyncCache.completeSync(uuid, code);

  res.status(syncResposne.error ? 400 : 200).send(syncResposne);
};

export default handler;
