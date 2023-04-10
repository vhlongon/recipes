import { Recipe } from '@prisma/client';

export const generatePrompt = (body: any) => {
  const { type, preparationTime, ingredients, portions, kcal } = body;
  const prompt = `Generate a ${type} recipe that takes ${preparationTime} and includes the following ingredients:\n${ingredients.join(
    '\n'
  )}\n\nThis recipe makes ${portions} portions, with each portion containing approximately ${kcal} kcal. Generate the result divided into sections, i.e. "description:" containing a short description for it, "instructions:" containing step for step preparation, "hashtags:" containing a list of max of three hashtags based on the recipe`;

  return prompt;
};
export const parseAnswer = (
  answer: string
): Pick<Recipe, 'hashtags' | 'description' | 'instructions'> => {
  const recipe = answer;
  const sections = recipe.split('\n\n');
  const descriptionSection = sections.find(section =>
    section.includes('Description:')
  );
  const instructionsSection = sections.find(section =>
    section.includes('Instructions:')
  );
  const description =
    descriptionSection
      ?.split('\n')
      .slice(1)
      .map(item => item.trim())
      ?.join(' ') ?? '';
  const instructions =
    instructionsSection
      ?.split('\n')
      .slice(1)
      .map(item => item.trim()) ?? [];

  const hashtagsMatch = recipe.match(/#([a-zA-Z0-9]+)/g);
  const hashtags = hashtagsMatch
    ? hashtagsMatch.map(hashtag => hashtag.substring(1))
    : [];

  return {
    description,
    instructions,
    hashtags,
  };
};
