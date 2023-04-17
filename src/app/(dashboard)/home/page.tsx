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
          <div className="flex w-full gap-6 p-6 justify-between">
            {greetings}
            <CreateRecipe />
          </div>
          <div className="max-h-panel scrollable  overflow-y-scroll">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-6">
              {recipes.map(recipe => (
                <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
                  <RecipePreview {...recipe} />
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4 w-full h-full items-center relative justify-center text-2xl text-slate-50">
          <div className="absolute top-6 left-6 w-full">{greetings}</div>
          No recipes yet
          <CreateRecipe />
        </div>
      )}
    </>
  );
};

export default DashboardHomePage;
