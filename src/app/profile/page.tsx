import { Provider } from '@/components/Provider';
import { EditOrDeleteModal } from '@/components/actions/EditDeleteModal';
import { EditDeleteUser } from '@/components/actions/EditDeleteUser';
import { ProfileImage } from '@/components/layout/ProfileImage';
import { Card } from '@/components/ui/Card';
import { getUser } from '@/lib/data';
import { AtSign, User } from 'react-feather';

const ProfilePage = async () => {
  const user = await getUser();

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <Card
        title={
          <div className="flex items-center gap-2">
            <User />
            Profile
          </div>
        }
        className="m-auto w-full max-w-md"
        actions={
          <EditOrDeleteModal>
            <Provider>
              <EditDeleteUser user={user} />
            </Provider>
          </EditOrDeleteModal>
        }>
        <div className="flex gap-4">
          <div className="avatar">
            <ProfileImage src={user.image ?? ''} />
          </div>

          <div className="flex flex-1 flex-col justify-center">
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
