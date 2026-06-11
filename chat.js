export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { message, history = [], memory = {}, vision_image = null } = req.body || {};

    const reply = `I heard: ${message}`;

    const updatedMemory = {
      ...memory,
      lastUserMessage: message,
      lastSeen: new Date().toISOString(),
    };

    const coreMemories = [
      ...(Array.isArray(memory.coreMemories) ? memory.coreMemories : []),
      `User said: ${message}`.slice(0, 140),
    ].slice(-12);

    const insights = [
      { key: 'Conversation', text: 'Chat is now connected.' },
      { key: 'Last message', text: message },
    ];

    return res.status(200).json({
      reply,
      updatedMemory,
      coreMemories,
      insights,
      visionUsed: Boolean(vision_image),
      historyLength: history.length,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
