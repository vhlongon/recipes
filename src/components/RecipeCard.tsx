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

export const RecipeCard = ({
  createdAt,
  description,
  hashtags,
  id,
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
      className="hover:scale-105 transition-all ease-in-out duration-200"
      title={
        <div className="flex items-center gap-4 w-full justify-between">
          {title}
          <Badge
            title="type"
            variant="primary"
            size="lg"
            className="font-bold tracking-wider"
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
