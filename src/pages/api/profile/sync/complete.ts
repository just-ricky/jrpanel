import { connect } from '@/database/database';
import MinecraftUser from '@/models/MinecraftUser';
import SyncSession from '@/models/SyncSession';

connect();

type SyncResponse = {
  error: boolean;
  message: string;
};

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

  // check if this user is syncing
  const syncSession = await SyncSession.findOne({ code: code });

  // create response
  let syncResponse: SyncResponse;

  if (!syncSession) {
    syncResponse = { error: true, message: `no sync session found` };
  } else {
    // update minecraft user
    await MinecraftUser.updateOne(
      { auth0id: syncSession.auth0id },
      { $set: { 'minecraft.accountSynced': true, 'minecraft.uuid': uuid } },
    );

    // remove sync session
    await SyncSession.deleteOne({ auth0id: syncSession.auth0id });

    syncResponse = { error: false, message: `success` };
  }

  res.status(syncResponse.error ? 400 : 200).send(syncResponse);
};

export default handler;
