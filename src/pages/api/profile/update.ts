import { connect } from '@/database/database';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

connect();

const handler = withApiAuthRequired(async (req: any, res: any) => {
  const session = getSession(req, res);

  res.status(200).send({ s: session });
});

export default handler;
