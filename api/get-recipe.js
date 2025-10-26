//import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { ingredients } = req.body;
  if (!ingredients) return res.status(400).json({ error: 'Missing ingredients' });

  const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients.
You don't need to use every ingredient they mention in your recipe.
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients.
Format your response in markdown.
`;

  const userPrompt = `${SYSTEM_PROMPT}\nUser: I have ${ingredients.join(', ')}. Please give me a recipe you'd recommend I make!`;

  try {
    const hfResp = await fetch(
      'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: userPrompt,
          parameters: { max_new_tokens: 512, temperature: 0.7 },
        }),
      }
    );

    if (!hfResp.ok) {
      const text = await hfResp.text();
      return res.status(502).json({ error: 'Hugging Face error', details: text });
    }

    const data = await hfResp.json();
    const generated = Array.isArray(data) ? data[0].generated_text : data.generated_text;
    return res.status(200).json({ recipe: generated });
  } catch (err) {
    return res.status(500).json({ error: 'Server failed', message: err.message });
  }
}