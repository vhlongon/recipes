import { Configuration, OpenAIApi } from 'openai';
import { getUserSettings } from './data';
import { generatePrompt, generateRecipeImagePrompt, parseAnswer } from './recipe';
import { Recipe } from '@prisma/client';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const generateRecipeCompletion = async (
  body: Pick<Recipe, 'type' | 'preparationTime' | 'ingredients' | 'portions' | 'kcal'>
) => {
  const prompt = generatePrompt(body);
  const promptLength = prompt.length;
  const settings = await getUserSettings();

  const completionResponse = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    temperature: settings?.temperature || 1,
    max_tokens: (settings?.maxTokens || 4000) - promptLength,
  });

  const answer = completionResponse.data.choices[0].text ?? '';
  const parsed = parseAnswer(answer);

  const imageResponse = await openai.createImage({
    prompt: generateRecipeImagePrompt({
      ingredients: body.ingredients,
      description: parsed.description ?? '',
    }),
    n: 1,
    size: '512x512',
  });

  const image = imageResponse.data.data[0].url;

  return { ...parsed, image };
};
