import { getUserRecipe } from '@/lib/data';

type RecipePageProps = {
  params: {
    id: string;
  };
};
const RecipePage = async ({ params }: RecipePageProps) => {
  const data = await getUserRecipe(params.id);

  return (
    <div>
      RecipePage for recipe: {params.id}
      <div className="mt-8">
        {data &&
          Object.keys(data).map((key, index) => {
            return (
              <div key={index}>
                {key}: {JSON.stringify(data[key])}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RecipePage;
