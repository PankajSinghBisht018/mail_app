import { useUser } from '@clerk/clerk-react';

export const checkRole = (requiredRole) => {
  const { user } = useUser();
  return user && user.publicMetadata && user.publicMetadata.role === requiredRole;
};
