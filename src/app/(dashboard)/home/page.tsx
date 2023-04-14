import { CreateRecipe } from '@/components/CreateRecipe';
import { Greetings, GreetingsSkeleton } from '@/components/Greetings';
import { RecipePreview } from '@/components/RecipePreview';
import { getUsersRecipes } from '@/lib/data';
import Link from 'next/link';
import { Suspense } from 'react';

const DashboardHomePage = async () => {
  const recipes = await getUsersRecipes();

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
          <div className="flex w-full p-6 justify-between">
            {greetings}
            <CreateRecipe />
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-6 max-h-panel scrollable  overflow-y-scroll">
            {recipes.map(recipe => (
              <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
                <RecipePreview {...recipe} />
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4 w-full h-full items-center justify-center text-2xl text-slate-50">
          {greetings}
          No recipes yet
          <CreateRecipe />
        </div>
      )}
    </>
  );
};

export default DashboardHomePage;
