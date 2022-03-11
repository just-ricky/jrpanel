import { connect } from '@/database/database';
import MinecraftUser, { IMinecraftUser } from '@/models/MinecraftUser';
import SyncSession from '@/models/SyncSession';
import { getSession, Session, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { SyncStartResponse } from '../../../../types/sync/index';

connect();

const generateCode = (n: number): string => {
  const add = 1;
  let max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

  if (n > max) {
    return generateCode(max) + generateCode(n - max);
  }

  max = Math.pow(10, n + add);
  const min = max / 10; // Math.pow(10, n) basically
  const number = Math.floor(Math.random() * (max - min + 1)) + min;

  return (`` + number).substring(add);
};

const handler = withApiAuthRequired(async (req: any, res: any) => {
  // get session
  const session: Session | null | undefined = getSession(req, res);

  if (session === null || session === undefined) {
    return res.status(400).send({ error: true });
  }

  // get minecraft user
  const mu: IMinecraftUser | null = await MinecraftUser.findOne({
    auth0id: session.user.sub,
  });

  let response: SyncStartResponse;

  // if doesn't exist
  if (!mu) {
    response = {
      error: true,
      message: `this account has a problem`,
      code: null,
    };
    return res.status(400).send(response);
  }

  // if it's already synced
  if (mu.minecraft.accountSynced) {
    response = {
      error: true,
      message: `this account is already synced`,
      code: null,
    };

    return res.status(400).send(response);
  }

  // try to find object in sync session database
  const syncSession = await SyncSession.findOne({ auth0id: session.user.sub });

  if (syncSession) {
    response = { error: false, message: null, code: syncSession.code };
    return res.status(200).send(response);
  }

  // get user
  const user = session.user;

  // create new code (6 digits in length)
  const code = generateCode(6);

  // create new sync session object
  const newSession = await SyncSession.create({
    auth0id: user.sub,
    code: code,
  });

  response = { error: false, message: null, code: newSession.code };
  res.status(200).send(response);
});

export default handler;
