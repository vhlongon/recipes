import { RecipeCard } from '@/components/RecipeCard';
import { getUserFromCookies } from '@/lib/cookies';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

const getData = async () => {
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return [];
  }

  return await db.recipe.findMany({
    where: {
      userId: user.id,
    },
  });
};

const DashboardHomePage = async () => {
  const recipes = await getData();

  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="grid">
          {recipes?.length > 0 ? (
            recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />)
          ) : (
            <div className="flex-1">No recipes yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
