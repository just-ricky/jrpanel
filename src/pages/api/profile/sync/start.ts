import mcSyncCache from '@/cache/mc-sync-cache';
import { connect } from '@/database/database';
import MinecraftUser, { IMinecraftUser } from '@/models/MinecraftUser';
import { getSession, Session, withApiAuthRequired } from '@auth0/nextjs-auth0';

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

  // if doesn't exist
  if (!mu) {
    return res
      .status(400)
      .send({ error: true, message: `this account has a problem` });
  }

  // if it's already synced
  if (mu.minecraft.accountSynced) {
    return res
      .status(400)
      .send({ error: true, message: `this account is already synced` });
  }

  // if already syncing
  if (mcSyncCache.isSyncingAlready(session.user.sub)) {
    return res
      .status(400)
      .send({ error: true, message: `this account is already syncing` });
  }

  // get user
  const user = session.user;

  // create new code (6 digits in length)
  const code = generateCode(6);

  mcSyncCache.startSync(user.sub, code);

  res.status(200).send({ code: code });
});

export default handler;
