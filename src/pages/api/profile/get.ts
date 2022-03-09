import { connect } from '@/database/database';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import MinecraftUser, { IMinecraftUser } from '../../../models/MinecraftUser';

connect();

const handler = withApiAuthRequired(async (req: any, res: any) => {
  const session = getSession(req, res);

  // get minecraft user
  const mu: IMinecraftUser | null = await MinecraftUser.findOne({
    auth0id: session?.user.sub,
  });

  res.status(200).send(mu);
});

export default handler;
