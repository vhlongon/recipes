import { db } from '@/lib/db';
import { hashPassword } from '@/lib/password';
import { Recipe, RecipeType } from '@prisma/client';

const getRandomRecipeType = () => {
  const types = Object.values(RecipeType);

  return types[Math.floor(Math.random() * types.length)];
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

const main = async () => {
  const recipes = Array(3)
    .fill(0)
    .map((_, i) => createRecipe({ title: `${i} - Recipe title` }));

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
    },
    include: {
      recipes: true,
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
