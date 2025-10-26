import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients.
You don't need to use every ingredient they mention in your recipe.
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients.
Format your response in markdown to make it easier to render to a web page.
`

const hf = new HfInference(process.env.REACT_APP_HF_ACCESS_TOKEN);

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(', ');
  const userPrompt = `${SYSTEM_PROMPT}\nUser: I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`;

  try {
    const response = await hf.textGeneration({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      inputs: userPrompt,
      parameters: {
        max_new_tokens: 512,
        temperature: 0.7,
      },
    });
    return response.generated_text;
  } catch (err) {
    console.error('Error:', err.message);
  }
}
