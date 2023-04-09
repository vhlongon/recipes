import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generatePrompt = (body: any) => {
  const { type, preparationTime, ingredients, portions, kcal } = body;
  const prompt = `Generate a ${type} recipe that takes ${preparationTime} and includes the following ingredients:\n${ingredients.join(
    '\n'
  )}\n\nThis recipe makes ${portions} portions, with each portion containing ${kcal} kcal. Generate a short description for it and a list of hashtags based on its ingredients, type and number of servings.`;

  return prompt;
};

const parseAnswer = (answer: string) => {
  const recipe = answer;
  const sections = recipe.split('\n\n');
  const descriptionSection = sections.find(section =>
    section.includes('Description:')
  );
  const ingredientsSection = sections.find(section =>
    section.includes('Ingredients:')
  );
  const directionsSection = sections.find(section =>
    section.includes('Directions:')
  );
  const description = descriptionSection
    ?.split('\n')
    .slice(1)
    .map(item => item.trim());
  const ingredients = ingredientsSection
    ?.split('\n')
    .slice(1)
    .map(item => item.trim());
  const directions = directionsSection
    ?.split('\n')
    .slice(1)
    .map(item => item.trim());

  // Extract the hashtags from the OpenAI response
  const hashtagsMatch = recipe.match(/#([a-zA-Z0-9]+)/g);
  const hashtags = hashtagsMatch
    ? hashtagsMatch.map(hashtag => hashtag.toLowerCase())
    : [];

  return {
    description,
    ingredients,
    directions,
    hashtags,
  };
};

export async function POST(request: Request) {
  const body = await request.json();

  const prompt = generatePrompt(body);
  console.log(prompt);

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.5,
      max_tokens: 3000,
      // stop: '\n\n',
    });

    console.log(response);

    const answer = response.data.choices[0].text ?? '';

    console.log('🚀 ~ answer:', answer);

    const { description, ingredients, directions, hashtags } =
      parseAnswer(answer);

    return NextResponse.json(
      {
        data: {
          description,
          ingredients,
          directions,
          preparationTime: body.preparationTime,
          type: body.type,
          portions: body.portions,
          kcal: body.kcal,
          hashtags,
          prompt,
        },
      },
      {
        status: 200,
        statusText: 'ok',
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { data: { message: `could not generate recipe: ${error.message}` } },
      {
        status: 500,
        statusText: 'could not generate recipe',
      }
    );
  }
}
