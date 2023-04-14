import { getUserFromCookies } from '@/lib/cookies';
import { getUser } from '@/lib/data';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { ButtonLink } from './ButtonLink';
import { Card } from './Card';

export const GreetingsSkeleton = () => {
  return (
    <Card className="w-full">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-8 w-56 bg-gray-300 rounded"></div>
          <div className="space-y-3 w-3/4">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="space-y-3 h-12 bg-gray-300 rounded w-32"></div>
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
        title={`Hello ${user?.firstName} ${user?.lastName}`}
        className="w-full max-w-xl"
      >
        <p className="text-slate-600">
          Welcome back! Time to get creative and come up with some new recipes?
          Or wanna check your current ones?
        </p>
      </Card>
    </>
  );
};
