import { connect } from '@/database/database';
import MinecraftUser, { IMinecraftUser } from '@/models/MinecraftUser';
import { getSession, Session, withApiAuthRequired } from '@auth0/nextjs-auth0';

connect();

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
  if (!mu || !mu.minecraft.accountSynced) {
    return res
      .status(400)
      .send({ error: true, message: `this account is not synced` });
  }

  // update by removing sync
  await MinecraftUser.updateOne(
    { auth0id: session.user.sub },
    {
      $set: {
        'minecraft.accountSynced': false,
        'minecraft.uuid': null,
        'minecraft.rank': null,
      },
    },
  );

  res.status(200).send({ error: false, message: `success` });
});

export default handler;
