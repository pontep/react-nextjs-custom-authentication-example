import { Fragment } from "react";
import { useUserContext } from "../../libs/user-context";

const UserProfile = () => {
  const { user } = useUserContext();

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

export default UserProfile;
