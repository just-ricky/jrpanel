import MinecraftUser, { IMinecraftUser } from '@/models/MinecraftUser';
import { connect } from '@/database/database';
import cache from 'memory-cache';

connect();

export type SyncResponse = {
  error: boolean;
  message: string;
};

class MCSyncCache {
  startSync(auth0id: string, code: string) {
    cache.put(auth0id, code);
  }

  stopSync(auth0id: string) {
    cache.del(auth0id);
  }

  async completeSync(uuid: string, code: string): Promise<SyncResponse> {
    // create entries
    const entries: { key: string; value: string }[] = [];

    cache.keys().forEach((key) => {
      entries.push({ key: key, value: cache.get(key) });
    });

    // filter entries to correct one
    const entry = entries.find((e) => e.value === code);

    if (!entry || entry === undefined) {
      return { error: true, message: `no sync session found` };
    }

    // remove from cache
    cache.del(entry.key);

    // get key
    const a0uid = entry.key;

    // get minecraft user
    const mu: IMinecraftUser | null = await MinecraftUser.findOne({
      auth0id: a0uid,
    });

    if (mu && mu.minecraft.accountSynced) {
      return { error: true, message: `account already synced` };
    }

    // update minecraft user
    await MinecraftUser.updateOne(
      { auth0id: a0uid },
      { $set: { 'minecraft.accountSynced': true, 'minecraft.uuid': uuid } },
    );

    return { error: false, message: `success` };
  }

  isSyncingAlready(auth0id: string) {
    return cache.keys().includes(auth0id);
  }
}

let instance: MCSyncCache | null = null;

if (!instance || instance === null || instance === undefined) {
  instance = new MCSyncCache();
}

const instanceCloneBypass: MCSyncCache = instance;

export default instanceCloneBypass;
