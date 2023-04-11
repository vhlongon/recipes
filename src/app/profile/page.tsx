import { Card } from '@/components/Card';
import { EditOrDeleteModal } from '@/components/EditDeleteModal';
import { EditDeleteUser } from '@/components/EditDeleteUser';
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
        actions={
          <EditOrDeleteModal>
            <EditDeleteUser user={user} />
          </EditOrDeleteModal>
        }
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
