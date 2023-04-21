import Replicate from 'replicate';
import { generateRecipeImagePrompt } from './recipe';
import { Recipe } from '@prisma/client';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// different from the image generation when we create a recipe (where we use the openai api)
// this uses the replicate api to generate a new image for a recipe using the kandinsky model
export const generateImageRecipe = async ({
  ingredients,
  description,
}: Pick<Recipe, 'ingredients' | 'description'>) => {
  const model = 'ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f';

  const input = {
    prompt: generateRecipeImagePrompt({ ingredients, description: description ?? '' }),
    width: 512,
    height: 512,
  };
  const response = (await replicate.run(model, { input })) as string[];

  const [url] = response;

  return url;
};
