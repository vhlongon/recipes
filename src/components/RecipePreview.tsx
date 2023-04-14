import { formatDate } from '@/lib/date';
import { Recipe } from '@prisma/client';
import clsx from 'clsx';
import { Calendar, Clock, Hash, PlusCircle } from 'react-feather';
import { Badge } from './Badge';
import { Card } from './Card';

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
      className={clsx(
        'hover:scale-[1.025] transition-all ease-in-out duration-200 h-full',
        className
      )}
      title={
        <div className="flex items-center gap-4 w-full justify-between">
          {title}
          <Badge
            title="type"
            variant="primary"
            className="font-bold tracking-widest"
          >
            {type}
          </Badge>
        </div>
      }
    >
      <p className="gap-4 italic line-clamp-2">
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
        <div className="flex flex-wrap gap-2 my-2">
          {hashtags.slice(0, 3).map(hashtag => (
            <Badge
              key={hashtag}
              variant="secondary"
              icon={<Hash width="1rem" />}
            >
              {hashtag}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex w-full flex-wrap mt-2 gap-2">
        <Badge title="created at" icon={<Calendar width="1rem" />}>
          {formatDate(createdAt)}
        </Badge>
        <Badge
          title="preparation"
          variant="success"
          icon={<Clock width="1rem" />}
        >
          {preparationTime}min
        </Badge>
        <Badge title="kcal" variant="warning" icon={<Clock width="1rem" />}>
          Kcal: {kcal}
        </Badge>
        <Badge
          title="portions"
          variant="info"
          icon={<PlusCircle width="1rem" />}
        >
          {portions}
        </Badge>
      </div>
    </Card>
  );
};
