import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';

export default async function Home() {
  return (
    <div>
      <Card
        title="this is the title"
        actions={<Button variant="accent">click me</Button>}
      >
        <p>some more description</p>

        <Input id="text-test" color="secondary" variant="bordered" />
      </Card>
    </div>
  );
}
