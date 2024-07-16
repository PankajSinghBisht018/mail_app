
export const checkRole = (user, requiredRole) => {
  return user?.publicMetadata?.role === requiredRole;
};
