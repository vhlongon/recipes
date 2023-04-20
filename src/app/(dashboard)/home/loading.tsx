import { RecipeCardSkeleton } from '@/components/recipe/RecipeCard';
import { getUserRecipeCount } from '@/lib/data';

const DashBoardLoader = async () => {
  const totalRecipes = await getUserRecipeCount();
  return (
    <div className="scrollable grid max-h-panel grid-cols-1 gap-6 overflow-y-scroll p-6 lg:grid-cols-2  xl:grid-cols-3">
      {Array.from({ length: totalRecipes }, (_, i) => {
        return <RecipeCardSkeleton key={i} />;
      })}
    </div>
  );
};

export default DashBoardLoader;
