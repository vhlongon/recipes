import { formatDate } from '@/lib/date';
import { Recipe } from '@prisma/client';
import clsx from 'clsx';
import { Calendar, Clock, Hash, PlusCircle } from 'react-feather';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

type RecipeCardProps = {
  className?: string;
} & Recipe;

export const RecipePreview = ({
  createdAt,
  description,
  hashtags,
  ingredients,
  kcal,
  portions,
  preparationTime,
  title,
  type,
  className,
}: RecipeCardProps) => {
  return (
    <Card
      className={clsx('h-full transition-all duration-200 ease-in-out hover:scale-[1.025]', className)}
      title={
        <div className="flex w-full items-center justify-between gap-4">
          {title}
          <Badge title="type" variant="primary" className="font-bold tracking-widest">
            {type}
          </Badge>
        </div>
      }>
      <p className="line-clamp-2 gap-4 italic">
        {description || `A delicous recipe using: ${ingredients.join(', ')}.`}
      </p>

      {ingredients && (
        <div title="ingredients" className="flex flex-wrap gap-1">
          <span className="font-semibold">Ingredients:</span>
          {ingredients.map(ingredient => (
            <span key={ingredient}>{ingredient}</span>
          ))}
        </div>
      )}

      {hashtags && (
        <div className="my-2 flex flex-wrap gap-2">
          {hashtags.slice(0, 3).map(hashtag => (
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
