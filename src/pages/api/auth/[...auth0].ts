import {
  handleAuth,
  handleCallback,
  handleLogin,
  Session,
} from '@auth0/nextjs-auth0';
import { connect } from '@/database/database';
import MinecraftUser from '@/models/MinecraftUser';

connect();

const afterCallback = (req: any, res: any, session: any, state: any) => {
  checkOrCreateMongoUser(session);
  return session;
};

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        returnTo: `/panel`,
      });
    } catch (error: any) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error: any) {
      res.status(error.status || 500).end(error.message);
    }
  },
});

const checkOrCreateMongoUser = async (session: Session) => {
  const uId = session?.user.sub;

  // this should never be satisfied, but it never hurts to plan ahead
  if (!uId) {
    return;
  }

  let mu = await MinecraftUser.findOne({ auth0id: uId });

  if (!mu) {
    // create, since it doesn't exist
    mu = await MinecraftUser.create({
      auth0id: uId,
      email: session?.user.email,
      minecraft: { uuid: null, accountSynced: false, rank: null },
    });
  }
};
