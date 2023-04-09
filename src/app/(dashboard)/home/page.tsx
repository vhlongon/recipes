import { CreateRecipe } from '@/components/CreateRecipe';
import { RecipeCard } from '@/components/RecipeCard';
import { getUsersRecipes } from '@/lib/data';
import Link from 'next/link';

const DashboardHomePage = async () => {
  const recipes = await getUsersRecipes();

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
      <CreateRecipe />
    </div>
  );
};

export default DashboardHomePage;
