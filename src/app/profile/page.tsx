import { Card } from '@/components/Card';
import { EditOrDeleteModal } from '@/components/EditDeleteModal';
import { EditDeleteUser } from '@/components/EditDeleteUser';
import { ProfileImage } from '@/components/ProfileImage';
import { getUser } from '@/lib/data';
import { AtSign, User } from 'react-feather';

const ProfilePage = async () => {
  const user = await getUser();

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="flex flex-1 justify-center w-full h-full items-center">
      <Card
        title={
          <div className="flex items-center gap-2">
            <User />
            Profile
          </div>
        }
        className="w-full max-w-md m-auto"
        actions={
          <EditOrDeleteModal>
            <EditDeleteUser user={user} />
          </EditOrDeleteModal>
        }
      >
        <div className="flex gap-4">
          <div className="avatar">
            <ProfileImage src={user.image ?? ''} />
          </div>

          <div className="flex flex-col flex-1 justify-center">
            <span className="font-semibold">
              {user.firstName} {user.lastName}
            </span>

            <div className="flex items-center gap-1 text-sm opacity-50">
              <AtSign size="1rem" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
