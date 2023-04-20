import { EditOrDeleteModal } from '@/components/actions/EditDeleteModal';
import { EditDeleteRecipe } from '@/components/actions/EditDeleteRecipe';
import { ShareRecipe } from '@/components/actions/ShareRecipe';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { getUser, getUserRecipe } from '@/lib/data';
import { Metadata } from 'next';

type RecipePageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const recipe = await getUserRecipe(params.id);
  const title = recipe?.title ?? 'Fantastic recipe';
  const description = recipe?.description ?? `Delicious recipe using ${recipe?.ingredients?.join(', ')}.`;
  const url = recipe?.image ?? '/recipe-image-placeholder.jpg';
  const user = await getUser();
  const author = user ? `${user.firstName} ${user.lastName}` : 'unknown';
  const images = [{ url, alt: title, width: 512, height: 341 }];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      authors: [author],
      publishedTime: recipe?.createdAt,
      type: 'article',
      siteName: 'Fantastic recipes',
      tags: recipe?.hashtags ?? [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      siteId: '1467726470533754880',
      creator: author,
      creatorId: recipe?.createdAt,
      images,
    },
  };
}

const RecipePage = async ({ params }: RecipePageProps) => {
  const recipe = await getUserRecipe(params.id);

  if (!recipe) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-2xl text-base-content">
        Recipe not found
        <ButtonLink href="/home">Go to recipes</ButtonLink>
      </div>
    );
  }

  return (
    <div className="m-auto flex h-full w-full max-w-2xl items-center justify-center justify-items-center p-6">
      <RecipeCard
        {...recipe}
        actions={
          <div className="flex w-full items-center justify-between">
            <ShareRecipe title={recipe.title} description={recipe.description ?? ''} hashtags={recipe.hashtags} />
            <EditOrDeleteModal>
              <EditDeleteRecipe recipe={recipe} />
            </EditOrDeleteModal>
          </div>
        }
      />
    </div>
  );
};

export default RecipePage;
