import { ProtectForm } from '@/components/ProtectForm';

export default async function Home() {
  return (
    <div className="bg-gradient w-screen p-8 flex justify-center items-center h-screen">
      <ProtectForm />
    </div>
  );
}
