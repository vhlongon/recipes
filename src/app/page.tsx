import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Inter } from 'next/font/google';

export default function Home() {
  return (
    <main>
      <Card
        title="this is the title"
        actions={<Button variant="secondary">click me</Button>}
      >
        <p>some more description</p>

        <Input id="text-test" color="secondary" variant="bordered" />
      </Card>
    </main>
  );
}
