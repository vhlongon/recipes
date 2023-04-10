import { Greetings, GreetingsSkeleton } from '@/components/Greetings';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <div className="w-full p-8 flex justify-center items-center h-full">
      <Suspense fallback={<GreetingsSkeleton />}>
        {/* @ts-expect-error */}
        <Greetings />
      </Suspense>
    </div>
  );
}
