import { FC } from "react";
import { erzahler } from "../../utils/general/erzahler";
import { User } from "firebase/auth";
import { useQuery } from "react-query";
import StallGlobe from "../icons/StallGlobe";
import { NavBarSignedIn } from "../nav-bar/NavBarSignedIn";
import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css'
import { NavBarSignedOut } from "../nav-bar/NavBarSignedOut";

interface IndexBodyProps {
  user: User | null;
}

const IndexBody: FC<IndexBodyProps> = ({user}: IndexBodyProps) => {
  const router = useRouter();

  const { isLoading, error, data, isFetching } = useQuery('userProfile', () => {
    return user?.getIdToken().then((idToken: string) => {
      return fetch(`${erzahler.url}:${erzahler.port}/get-user-profile/${idToken}`)
        .then((response) => {
          return response.json();
        }).then((data) => {
          console.log('User:', user);
          console.log(`Data:`, data);
          return data;
        })
        .catch((error: Error) => {
          router.push('/');
        });
    });
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