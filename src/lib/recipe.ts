import { Recipe } from '@prisma/client';

export const generatePrompt = (body: any) => {
  const { type, preparationTime, ingredients, portions, kcal } = body;
  const prompt = `Generate a ${type} recipe that takes ${preparationTime} and includes the following ingredients:\n${ingredients.join(
    '\n'
  )}\n\nThis recipe makes ${portions} portions, each portion containing max ${kcal} kcal. Divide into sections, i.e. "Description:" containing a short creative description for the recipe, "Instructions:" with step for step preparation, "Hashtags:" with a list of three hashtags based on the recipe. Use metric system for units.`;

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

export const generateRecipeImagePrompt = ({
  description,
  ingredients,
}: {
  description?: string;
  ingredients: string[];
}) => {
  const prompt = `Generate a recipe image for a food recipe with the following description: ${
    description || ingredients.join(', ')
  }`;

  return prompt;
};
