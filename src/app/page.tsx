import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Inter } from 'next/font/google';

export default function Home() {
  return (
    <main>
      <Card
        title="this is the title"
        bordered
        actions={<Button variant="secondary">click me</Button>}
      >
        <p>some more description</p>
        <ul>
          <li>one</li>
          <li>two</li>
        </ul>
      </Card>
    </main>
  );
}
