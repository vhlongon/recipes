import { Greetings, GreetingsSkeleton } from '@/components/layout/Greetings';
import { CreateRecipe } from '@/components/recipe/CreateRecipe';
import { RecipePreview } from '@/components/recipe/RecipePreview';
import { getUserRecipes } from '@/lib/data';
import Link from 'next/link';
import { Suspense } from 'react';

export const revalidate = 0;

const DashboardHomePage = async () => {
  const recipes = await getUserRecipes();

  const hasRecipes = recipes?.length > 0;

  const greetings = (
    <Suspense fallback={<GreetingsSkeleton />}>
      {/* @ts-expect-error Async Server Component */}
      <Greetings />
    </Suspense>
  );

  return (
    <>
      {hasRecipes ? (
        <>
          <div className="flex w-full justify-between gap-6 p-6">
            {greetings}
            <CreateRecipe />
          </div>
          <div className="scrollable max-h-panel  overflow-y-scroll">
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
              {recipes.map(recipe => (
                <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
                  <RecipePreview {...recipe} />
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 text-2xl text-base-content">
          <div className="absolute left-6 top-6 w-full">{greetings}</div>
          No recipes yet
          <CreateRecipe />
        </div>
      )}
    </>
  );
};

export default DashboardHomePage;
