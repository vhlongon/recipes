import { ButtonLink } from '@/components/ButtonLink';
import { EditOrDeleteActions } from '@/components/EditOrDeleteActions';
import { RecipeCard } from '@/components/RecipeCard';
import { getUserRecipe } from '@/lib/data';

type RecipePageProps = {
  params: {
    id: string;
  };
};
const RecipePage = async ({ params }: RecipePageProps) => {
  const recipe = await getUserRecipe(params.id);

  if (!recipe) {
    return (
      <div className="flex flex-col gap-4 w-full h-full items-center justify-center text-2xl text-slate-50">
        Recipe not found
        <ButtonLink href="/home">Go to recipes</ButtonLink>
      </div>
    );
  }

  return (
    <div className="flex p-6 h-full w-full justify-center justify-items-center items-center">
      <div>
        <RecipeCard
          {...recipe}
          actions={<EditOrDeleteActions recipe={recipe} />}
        />
      </div>
    </div>
  );
};

export default RecipePage;
