import { getUser } from '@/lib/data';
import { Provider } from '../Provider';
import { Card } from '../ui/Card';
import { GreetingsTitle } from './GreetingsTitle';

export const GreetingsSkeleton = () => {
  return (
    <Card className="w-full">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-8 w-56 rounded bg-gray-300"></div>
          <div className="w-3/4 space-y-3">
            <div className="h-4 rounded bg-gray-300"></div>
            <div className="h-4 rounded bg-gray-300"></div>
          </div>
          <div className="h-12 w-32 space-y-3 rounded bg-gray-300"></div>
        </div>
      </div>
    </Card>
  );
};

export const Greetings = async () => {
  const user = await getUser();

  return (
    <>
      <Card
        title={
          <Provider>
            <GreetingsTitle />
          </Provider>
        }
        className="w-full max-w-xl">
        <p className="text-slate-600">
          Welcome back!
          <br /> Time to get creative and come up with some new recipes?
        </p>
      </Card>
    </>
  );
};
