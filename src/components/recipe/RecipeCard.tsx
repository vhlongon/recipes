import { formatDate } from '@/lib/date';
import { Recipe } from '@prisma/client';
import clsx from 'clsx';
import { Calendar, CheckCircle, Circle, Clock, Hash, List, PlusCircle } from 'react-feather';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export const RecipeCardSkeleton = () => {
  return (
    <Card className="w-full">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="flex items-center justify-between">
            <div className="h-6 w-16 rounded bg-gray-300"></div>
            <div className="h-6 w-12 rounded bg-gray-300"></div>
          </div>
          <div className="mt-24 w-3/4 space-y-2">
            <div className="h-2 rounded bg-gray-300"></div>
            <div className="h-2 rounded bg-gray-300"></div>
          </div>
          <div className="h-4 w-40 rounded bg-gray-300"></div>
          <div className="w-1/3 space-y-3">
            <div className="h-2 rounded bg-gray-300"></div>
            <div className="h-2 rounded bg-gray-300"></div>
            <div className="h-2 rounded bg-gray-300"></div>
          </div>

          <div className="h-4 w-40 rounded bg-gray-300"></div>
          <div className="w-1/3 space-y-3">
            <div className="h-2 rounded bg-gray-300"></div>
            <div className="h-2 rounded bg-gray-300"></div>
            <div className="h-2 rounded bg-gray-300"></div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-12 rounded bg-gray-300"></div>
            <div className="h-4 w-12 rounded bg-gray-300"></div>
            <div className="h-4 w-12 rounded bg-gray-300"></div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-20 rounded bg-gray-300"></div>
            <div className="h-4 w-16 rounded bg-gray-300"></div>
            <div className="h-4 w-20 rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

type RecipeCardProps = {
  className?: string;
  actions?: React.ReactNode;
  createdAt: string;
  updatedAt: string;
} & Omit<Recipe, 'createdAt' | 'updatedAt'>;
export const RecipeCard = ({
  createdAt,
  description,
  hashtags,
  ingredients,
  instructions,
  kcal,
  portions,
  preparationTime,
  title,
  type,
  className,
  actions,
  image,
}: RecipeCardProps) => {
  return (
    <Card
      className={clsx(
        'h-full max-h-card w-full transition-all duration-200 ease-in-out hover:scale-[1.025]',
        className
      )}
      actions={actions}
      image={image || '/recipe-image-placeholder.jpg'}
      title={
        <div className="flex w-full items-center justify-between gap-4">
          {title}
          <Badge title="type" variant="primary" className="font-bold tracking-widest">
            {type}
          </Badge>
        </div>
      }>
      <p className="flex items-center gap-4">{description || `A delicous recipe using: ${ingredients.join(', ')}`}</p>

      {ingredients && (
        <div title="ingredients" className="flex flex-col">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <CheckCircle width="1.25rem" /> Ingredients
          </h3>
          <ul className="ms-2 list-inside">
            {ingredients.map(ingredient => (
              <li className="flex items-center gap-2" key={ingredient}>
                <Circle width="0.5rem" />
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      )}

      {instructions && (
        <div title="instructions" className="flex flex-col">
          <h3 className="item-center flex gap-2 text-lg font-semibold">
            <List width="1.25rem" />
            Instructions
          </h3>
          <ul className="ms-2 list-inside">
            {instructions.map(instruction => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ul>
        </div>
      )}

      {hashtags && (
        <div className="my-2 flex flex-wrap gap-2">
          {hashtags.map(hashtag => (
            <Badge key={hashtag} variant="secondary" icon={<Hash width="1rem" />}>
              {hashtag}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-2 flex w-full flex-wrap gap-2">
        <Badge title="created at" icon={<Calendar width="1rem" />}>
          {formatDate(createdAt)}
        </Badge>
        <Badge title="preparation" variant="success" icon={<Clock width="1rem" />}>
          {preparationTime}min
        </Badge>
        <Badge title="kcal" variant="warning" icon={<Clock width="1rem" />}>
          Kcal: {kcal}
        </Badge>
        <Badge title="portions" variant="info" icon={<PlusCircle width="1rem" />}>
          {portions}
        </Badge>
      </div>
    </Card>
  );
};
