import { kv } from '@vercel/kv';

const CHAT_ID = 'aura_chat_history';
const MEMORY_ID = 'aura_memory_state';
const CORE_ID = 'aura_core_memories';
const INSIGHTS_ID = 'aura_insights';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const memory = (await kv.get(MEMORY_ID)) || {};
      const history = (await kv.get(CHAT_ID)) || [];
      const coreMemories = (await kv.get(CORE_ID)) || [];
      const insights = (await kv.get(INSIGHTS_ID)) || [];
      return res.status(200).json({ memory, history, coreMemories, insights });
    }

    if (req.method === 'POST') {
      const body = req.body || {};

      if (body.action === 'save-turn') {
        if (body.memory) await kv.set(MEMORY_ID, body.memory);
        if (body.history) await kv.set(CHAT_ID, body.history);
        if (body.coreMemories) await kv.set(CORE_ID, body.coreMemories);
        if (body.insights) await kv.set(INSIGHTS_ID, body.insights);
        return res.status(200).json({ success: true });
      }

      if (body.action === 'save') {
        const memory = (await kv.get(MEMORY_ID)) || {};
        memory[body.key] = body.value;
        await kv.set(MEMORY_ID, memory);
        return res.status(200).json({ success: true, memory });
      }

      if (body.action === 'delete') {
        const memory = (await kv.get(MEMORY_ID)) || {};
        delete memory[body.key];
        await kv.set(MEMORY_ID, memory);
        return res.status(200).json({ success: true, memory });
      }

      return res.status(400).json({ error: 'Unknown action' });
    }

    if (req.method === 'DELETE') {
      await kv.del(MEMORY_ID);
      await kv.del(CHAT_ID);
      await kv.del(CORE_ID);
      await kv.del(INSIGHTS_ID);
      return res.status(200).json({ success: true });
    }

    return res.status(405).end();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
