import { EditOrDeleteModal } from '@/components/actions/EditDeleteModal';
import { EditDeleteRecipe } from '@/components/actions/EditDeleteRecipe';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { ButtonLink } from '@/components/ui/ButtonLink';
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
    <div className="flex p-6 h-full w-full max-w-3xl m-auto justify-center justify-items-center items-center">
      <div>
        <RecipeCard
          {...recipe}
          actions={
            <EditOrDeleteModal>
              <EditDeleteRecipe recipe={recipe} />
            </EditOrDeleteModal>
          }
        />
      </div>
    </div>
  );
};

export default RecipePage;
