import { getUser } from '@/lib/data';
import { formatDate } from '@/lib/date';
import React from 'react';

const ProfilePage = async () => {
  const user = await getUser();

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <div>Firstname: {user.firstName}</div>
      <div>LastName: {user.lastName}</div>
      <div>Registered: {formatDate(user.createdAt)}</div>
      <div>Email: {user.email}</div>
    </div>
  );
};

export default ProfilePage;
