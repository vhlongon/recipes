import { formatDate } from '@/lib/date';
import { Recipe } from '@prisma/client';
import {
  Calendar,
  CheckCircle,
  Clock,
  Hash,
  List,
  PlusCircle,
} from 'react-feather';
import { Card } from './Card';

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
      title={
        <div className="flex items-center gap-4 w-full justify-between">
          {title}
          <span title="type" className="badge badge-primary font-semibold py-3">
            {type}
          </span>
        </div>
      }
    >
      <p className="flex items-center gap-4">{description}</p>

      {ingredients && (
        <div title="ingredients" className="flex flex-col">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <CheckCircle width="1.25rem" /> Ingredients
          </h3>
          <ul className="ms-4">
            {ingredients.map(ingredient => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

      {instructions && (
        <div title="instructions" className="flex flex-col">
          <h3 className="text-lg font-bold flex item-center gap-2">
            <List width="1.25rem" />
            Instructions
          </h3>
          <ul className="ms-4">
            {instructions.map(instruction => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ul>
        </div>
      )}

      {hashtags && (
        <div className="flex flex-wrap gap-2 my-2">
          {hashtags.map(hashtag => (
            <span key={hashtag} className="badge badge-secondary py-3">
              <Hash width="1rem" />
              {hashtag}
            </span>
          ))}
        </div>
      )}

      <div className="flex w-full justify-between flex-wrap mt-2 gap-2">
        <span title="created at" className="badge gap-2 py-3">
          <Calendar width="1rem" />
          {formatDate(createdAt)}
        </span>
        <span title="preparation" className="badge badge-success gap-1 py-3">
          <Clock width="1rem" /> {preparationTime}min
        </span>

        <span title="kcal" className="badge badge-warning gap-1 py-3">
          <Clock width="1rem" /> Kcal: {kcal}
        </span>

        <span title="portions" className="badge badge-info gap-1 py-3">
          <PlusCircle width="1rem" /> {portions}
        </span>
      </div>
    </Card>
  );
};
