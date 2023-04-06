import { RecipeCard } from '@/components/RecipeCard';
import { getUserFromCookies } from '@/lib/cookies';
import { db } from '@/lib/db';
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
  });
};

const DashboardHomePage = async () => {
  const recipes = await getData();

  return (
    <div className="grid">
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
