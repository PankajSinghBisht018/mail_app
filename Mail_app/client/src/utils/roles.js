export const checkRole = (user, role) => {
  return user?.publicMetadata?.role === role;
};
