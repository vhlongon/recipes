import { formatDate } from '@/lib/date';
import { Recipe } from '@prisma/client';
import {
  Calendar,
  CheckCircle,
  Circle,
  Clock,
  Hash,
  List,
  PlusCircle,
} from 'react-feather';
import { Card } from './Card';
import { Badge } from './Badge';

export const RecipeCardSkeleton = () => {
  return (
    <Card className="w-full">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="flex justify-between items-center">
            <div className="h-6 w-48 bg-gray-300 rounded"></div>
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
          </div>
          <div className="space-y-2 w-3/4 mt-24">
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="h-2 bg-gray-300 rounded"></div>
          </div>
          <div className="h-4 bg-gray-300 w-40 rounded"></div>
          <div className="space-y-3 w-1/3">
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="h-2 bg-gray-300 rounded"></div>
          </div>

          <div className="h-4 bg-gray-300 w-40 rounded"></div>
          <div className="space-y-3 w-1/3">
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="h-2 bg-gray-300 rounded"></div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="h-4 bg-gray-300 w-12 rounded"></div>
            <div className="h-4 bg-gray-300 w-12 rounded"></div>
            <div className="h-4 bg-gray-300 w-12 rounded"></div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="h-4 bg-gray-300 w-24 rounded"></div>
            <div className="h-4 bg-gray-300 w-20 rounded"></div>
            <div className="h-4 bg-gray-300 w-24 rounded"></div>
            <div className="h-4 bg-gray-300 w-12 rounded"></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

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
}: Recipe) => {
  return (
    <Card
      className="hover:scale-[1.025] transition-all ease-in-out duration-200"
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
      <p className="flex items-center gap-4">{description}</p>

      {ingredients && (
        <div title="ingredients" className="flex flex-col">
          <h3 className="text-lg font-semibold flex items-center gap-2">
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
          <h3 className="text-lg font-semibold flex item-center gap-2">
            <List width="1.25rem" />
            Instructions
          </h3>
          <ol type="1" className="ms-2 list-decimal list-inside">
            {instructions.map(instruction => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
        </div>
      )}

      {hashtags && (
        <div className="flex flex-wrap gap-2 my-2">
          {hashtags.map(hashtag => (
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
