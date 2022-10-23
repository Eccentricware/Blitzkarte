import { FC, useContext } from "react";
import { erzahler } from "../../utils/general/erzahler";
import { User } from "firebase/auth";
import { useQuery } from "react-query";
import StallGlobe from "../icons/StallGlobe";
import { NavBarSignedIn } from "../nav-bar/NavBarSignedIn";
import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css'
import { NavBarSignedOut } from "../nav-bar/NavBarSignedOut";
import Blitzkontext from "../../utils/Blitzkontext";
import { UserRequestService } from "../../services/request-services/user-request-service";

interface IndexBodyProps {
  user: User | null;
}

const IndexBody: FC<IndexBodyProps> = ({user}: IndexBodyProps) => {
  const userCtx = useContext(Blitzkontext).user.user;
  const userRequestService = new UserRequestService();
  const router = useRouter();

  const { isLoading, error, data, isFetching } = useQuery('userProfile', () => {
    return userRequestService.getUserProfile();
  });

  if (isFetching) {
    return <StallGlobe mode="querying" message={'IndexBody: Fetching'}/>
  }

  if (isLoading) {
    return <StallGlobe mode="querying" message={'IndexBody: Loading'}/>
  }

  if (error) {
    return <StallGlobe mode="error" message={'IndexBody: Error'}/>
  }

  if (data) {
    return (
      <div>
       {data.username ? <NavBarSignedIn title={""}/> : <NavBarSignedOut title=""/>}
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to Project Blitzkarte!
          </h1>

          <p className={styles.description}>
            (It Means Lightning Maps)
          </p>
        </main>
      </div>
    )
  }

  return (
    <div>
      <StallGlobe mode="error" message={'IndexBody: Return'}/>
    </div>
  )
}

export default IndexBody;