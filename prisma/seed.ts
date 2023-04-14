import { db } from '@/lib/db';
import { hashPassword } from '@/lib/password';
import { Recipe, RecipeType, Settings } from '@prisma/client';

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = (min: number, max: number) => {
  return Number((Math.random() * (max - min) + min).toFixed(2));
};

const getRandomRecipeType = () => {
  const types = Object.values(RecipeType);

  return types[getRandomInt(0, types.length - 1)];
};

const createRecipe = (args?: Partial<Recipe>) => {
  return {
    preparationTime: Math.floor(Math.random() * 60),
    type: getRandomRecipeType(),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Recipe title',
    description: 'Recipe description',
    ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
    instructions: ['Instruction 1', 'Instruction 2', 'Instruction 3'],
    hashtags: ['Hashtag 1', 'Hashtag 2', 'Hashtag 3'],
    portions: Math.floor(Math.random() * 10),
    kcal: Math.floor(Math.random() * 1000),
    ...args,
  };
};

const createSettings = (args?: Partial<Settings>) => {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    theme: 'light',
    language: 'en',
    maxTokens: getRandomInt(2000, 4000),
    temperature: getRandomFloat(0.5, 2),
    ...args,
  };
};

const main = async () => {
  const recipes = Array(3)
    .fill(0)
    .map((_, i) => createRecipe({ title: `${i} - Recipe title` }));

  const settings = createSettings();

  const user = await db.user.upsert({
    where: { email: 'test@email.com' },
    update: {},
    create: {
      email: 'test@email.com',
      password: await hashPassword('password'),
      firstName: 'Victor',
      lastName: 'Longon',
      createdAt: new Date(),
      updatedAt: new Date(),
      recipes: {
        create: recipes,
      },
      settings: {
        create: settings,
      },
    },
    include: {
      recipes: true,
      settings: true,
    },
  });

  console.log({ user });
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
