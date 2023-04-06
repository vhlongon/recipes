type RecipePageProps = {
  params: {
    id: string;
  };
};
const RecipePage = ({ params }: RecipePageProps) => {
  return <div>RecipePage: {params.id}</div>;
};

export default RecipePage;
