import { User } from "firebase/auth";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { UserRequestService } from "../../services/request-services/user-request-service";
import { NavBarSignedIn } from "./NavBarSignedIn";
import { NavBarSignedOut } from "./NavBarSignedOut";

interface NavBarProps {
  firebaseUser: User;
}

export const NavBarSelector: FC<NavBarProps> = ({firebaseUser}: NavBarProps) => {
  const userRequestService = new UserRequestService();
  const [bkUser, setBkUser] = useState(undefined);

  const { data } = useQuery('getBkUser', () => {
    return userRequestService.getUserProfile()
  });

  if (data && !data.warning && !data.error) {
    console.log('NavBarSelector Data:', data);
    return (
      <NavBarSignedIn title="Yes user"/>
    )
  }

  return (
    <NavBarSignedOut title="No user"/>
  )
};