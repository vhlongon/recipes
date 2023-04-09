import { RecipeCardSkeleton } from '@/components/RecipeCard';
import { getUserRecipeCount } from '@/lib/data';

const DashBoardLoader = async () => {
  const totalRecipes = await getUserRecipeCount();
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-6 max-h-panel scrollable  overflow-y-scroll">
      {Array.from({ length: totalRecipes }, (_, i) => {
        return <RecipeCardSkeleton key={i} />;
      })}
    </div>
  );
};

export default DashBoardLoader;
