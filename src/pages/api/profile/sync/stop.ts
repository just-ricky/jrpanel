import mcSyncCache from '@/cache/mc-sync-cache';
import { connect } from '@/database/database';
import { getSession, Session, withApiAuthRequired } from '@auth0/nextjs-auth0';

connect();

const handler = withApiAuthRequired(async (req: any, res: any) => {
  // get session
  const session: Session | null | undefined = getSession(req, res);

  if (session === null || session === undefined) {
    return res.status(400).send({ error: true });
  }

  // if already syncing
  if (!mcSyncCache.isSyncingAlready(session.user.sub)) {
    return res
      .status(400)
      .send({ error: true, message: `this account is not currently syncing` });
  }

  // get user
  const user = session.user;

  mcSyncCache.stopSync(user.sub);

  res.status(200).send({ error: false, message: `success` });
});

export default handler;
