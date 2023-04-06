import { RecipeCardSkeleton } from '@/components/RecipeCard';
import { getUserFromCookies } from '@/lib/cookies';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

const getData = async () => {
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return 0;
  }

  const totalRecipes = await db.recipe.count({
    where: {
      userId: user.id,
    },
  });

  return totalRecipes;
};

const DashBoardLoader = async () => {
  const totalRecipes = await getData();
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-6 max-h-panel scrollable  overflow-y-scroll">
      {Array.from({ length: totalRecipes }, (_, i) => {
        return <RecipeCardSkeleton key={i} />;
      })}
    </div>
  );
};

export default DashBoardLoader;
