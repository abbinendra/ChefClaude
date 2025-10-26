export async function getRecipeFromMistral(ingredientsArr) {
  try {
    const resp = await fetch('/api/get-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: ingredientsArr }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('API error', resp.status, text);
      throw new Error('Failed to get recipe');
    }

    const { recipe } = await resp.json();
    return recipe;
  } catch (err) {
    console.error('Client error:', err.message);
    throw err;
  }
}