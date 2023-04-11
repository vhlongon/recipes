import { Card } from '@/components/Card';
import { EditDeleteUserActions } from '@/components/EditDeleteUserActions';
import { getUser } from '@/lib/data';
import { User } from 'react-feather';

const ProfilePage = async () => {
  const user = await getUser();

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="flex flex-1 justify-center w-full h-full items-center">
      <Card
        title={
          <div className="flex gap-2">
            <User />
            profile
          </div>
        }
        className="w-full max-w-md m-auto"
        actions={<EditDeleteUserActions user={user} />}
      >
        <div className="flex gap-2">
          <span>Email:</span>
          {user.email}
        </div>
        <div className="flex gap-2">
          <span>First name:</span>
          {user.firstName}
        </div>
        <div className="flex gap-2">
          <span>Last name:</span>
          {user.lastName}
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
