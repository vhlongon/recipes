import { Card } from '@/components/Card';
import { CreateRecipe } from '@/components/CreateRecipe';
import { RecipeCard } from '@/components/RecipeCard';
import { getUsersRecipes } from '@/lib/data';
import clsx from 'clsx';
import Link from 'next/link';

const DashboardHomePage = async () => {
  const recipes = await getUsersRecipes();

  const hasRecipes = recipes?.length > 0;

  return (
    <>
      {hasRecipes ? (
        <>
          <div
            className={clsx(
              'flex justify-end w-full pt-6 pl-6 pr-6',
              hasRecipes && 'pb-6'
            )}
          >
            <CreateRecipe mode="manual" />
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-6 max-h-panel scrollable  overflow-y-scroll">
            {recipes.map(recipe => (
              <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
                <RecipeCard {...recipe} />
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4 w-full h-full items-center justify-center text-2xl text-slate-50">
          No recipes yet
          <CreateRecipe mode="auto" />
        </div>
      )}
    </>
  );
};

export default DashboardHomePage;
