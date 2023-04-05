import { getUserFromCookies } from '@/lib/cookies';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { ButtonLink } from './ButtonLink';
import { Card } from './Card';
import { sleep } from '@/lib/sleep';

const getData = async () => {
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return null;
  }

  return db.user.findUnique({
    where: {
      id: user.id,
    },
  });
};

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
  await sleep(8000);
  const user = await getData();

  return (
    <>
      <Card
        title={`Hello ${user?.firstName} ${user?.lastName}`}
        className="w-full"
      >
        <p className="text-slate-600">
          Welcome back! Time to get creative and come up with some new recipes?
        </p>
        <p>or wanna check your current ones?</p>

        <ButtonLink
          variant="secondary"
          block={false}
          href="/home"
          className="w-fit mt-2"
        >
          dashboard
        </ButtonLink>
      </Card>
    </>
  );
};
