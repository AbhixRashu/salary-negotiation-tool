export const GET = async () => {
  return new Response(JSON.stringify({
    geminiKey: (process.env.GEMINI_API_KEY || '').substring(0, 10) + '...',
    geminiKeyLength: (process.env.GEMINI_API_KEY || '').length,
    keys: (process.env.GEMINI_API_KEY || '').split(',').map(k => k.trim()).filter(Boolean).length,
    nodeEnv: process.env.NODE_ENV,
    allKeys: Object.keys(process.env).filter(k => k.includes('GEMINI') || k.includes('API'))
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
