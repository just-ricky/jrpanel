import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';

type MinecraftMeta = {
  code: string;
  message: string;
  data: {
    player: {
      meta: {
        name_history: [{ name: string }];
      };
      username: string;
      id: string;
      raw_id: string;
      avatar: string;
    };
  };
};

const handler = withApiAuthRequired(async (req: any, res: any) => {
  // get uuid from query
  const uuid: string = req.query.uuid;

  // get player object
  try {
    const playerObject: MinecraftMeta = (await (
      await axios.get(`https://playerdb.co/api/player/minecraft/` + uuid)
    ).data) as MinecraftMeta;
    res.status(200).send(playerObject);
  } catch (e) {
    // console.error(e);
    res.status(400).send(null);
  }
});

export default handler;
