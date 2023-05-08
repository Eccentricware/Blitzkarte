import { FC } from "react";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css'
import Grid from "@mui/material/Grid";
import FAQ from "./FAQ";

interface IndexBodyProps {
  user: User | null;
}

const IndexBody: FC<IndexBodyProps> = ({user}: IndexBodyProps) => {
  const router = useRouter();

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Blitzkarte!
        </h1>
        <h3>Work in progress. Status: Invite-only partial testing!</h3>
      </main>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <h2 className="section-header">What is Blitzkarte?</h2>
          <div className="about-section">
            <p>
              <b>Diplomacy</b> is a 7 player strategy came of communication and coordination. All orders are processed simultaneously as their alliances and betrayal are revealed at the same time.
              It is based in WWI Europe with generally a single player victory where one person manages to get the majority of cities.
            </p>
            <p>
              <b>New World Order</b> is a variant of standard Diplomacy.
              The signature differences between it and other variants are a global scale with dozens of players being countries around the world,
              the additions of wings (air fighter squadrons), nukes, and victory by a coalition of 3 nominated countries.
              It is essentially World War 3 breaking out in the modern times.
            </p>
            <p>
              <b>Blitzkarte</b> is a program that fully automates the New World Order variant.
              Hours of work and processing each week by the human administrator are now done at lightning speed.
              Blitzkart has a file parsing system that allows users to implement their vision of game balance and design.
              Customize the rules, settings, and starting game state to your liking, and the rest will be automated gloriously.
            </p>
          </div>
          <div className="about-section">
            <b>If you are interested in getting involved, <a style={{color: 'red', cursor: 'pointer'}} href="https://forms.clickup.com/2331253/f/274kn-1100/8YGUU6DU3WO9VD8CLI">please fill out the custom intake form</a> and <a href="https://discord.gg/c2RxaB2qMz" style={{color: 'red', cursor: 'pointer'}}>join the official Discord server!</a></b>
          </div>
          <div className="about-section" onClick={() => router.push('/development')} style={{color: 'red', cursor: 'pointer'}}>
            <b>Development Page: Patch Notes, Known Bugs, RoadMap</b>
          </div>
          <div className="about-section">
            <b>There is not currently an official privacy policy page, but as the interim notification, only the email you used to sign up for is tracked.</b>
          </div>
        </Grid>
        <Grid item xs={6}>
          <FAQ />
        </Grid>
      </Grid>
    </div>
  )
}

export default IndexBody;