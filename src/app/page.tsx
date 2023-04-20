import { ProtectForm } from '@/components/forms/ProtectForm';

export default async function Home() {
  return (
    <div className="bg-gradient flex h-screen w-screen items-center justify-center p-8">
      <ProtectForm />
    </div>
  );
}
