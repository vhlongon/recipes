import { RecipeCard, RecipeCardSkeleton } from '@/components/RecipeCard';
import { getUserFromCookies } from '@/lib/cookies';
import { db } from '@/lib/db';
import { sleep } from '@/lib/sleep';
import { cookies } from 'next/headers';
import Link from 'next/link';

const getData = async () => {
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return [];
  }

  return await db.recipe.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

const DashboardHomePage = async () => {
  const recipes = await getData();

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-6 max-h-panel scrollable  overflow-y-scroll">
      {recipes?.length > 0 ? (
        recipes.map(recipe => (
          <div key={recipe.id}>
            <Link href={`/recipe/${recipe.id}`}>
              <RecipeCard {...recipe} />
            </Link>
          </div>
        ))
      ) : (
        <div className="flex-1">No recipes yet</div>
      )}
    </div>
  );
};

export default DashboardHomePage;
