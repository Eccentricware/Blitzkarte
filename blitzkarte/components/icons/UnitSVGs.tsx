import React, { FC } from 'react';
import Blitzkontext from "../../utils/Blitzkontext"

export const UnitSVGs = {
  army:
    <Blitzkontext.Consumer>
      {({map}) => {
        return (
          <svg width={map.unitSizing.army.width}
            height={map.unitSizing.army.height}
            viewBox="0 0 291.05 265.77"
          >
            < polygon id="bottom_right_track" data-name="bottom right track" points="213.92 258.09 153.24 230.63 150.64 224.18 149.7 218.36 161.57 218.36 170.13 229.37 222.9 249.64 213.92 258.09" fill="#424244" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="track_shadow" data-name="track shadow" points="158.96 229.37 171.61 229.37 171.61 233.79 186.02 233.79 186.02 240.18 202.36 240.18 202.36 248.13 224.51 248.13 231.45 241.6 240.93 226.01 244.07 212.37 244.07 202.52 241.96 215.43 237.12 221.64 232.82 223.75 225.7 223.75 221.58 221.02 220.3 218.36 158.96 218.36 158.96 229.37" fill="#272425" stroke="#272425" strokeMiterlimit="10" />
            <ellipse id="wheel" cx="223.58" cy="234.79" rx="7.03" ry="20.9" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="right_track" data-name="right track" points="238.91 167.5 241.46 171.11 244.07 182.78 244.07 202.52 244.07 212.37 240.93 226.01 231.45 241.6 213.92 258.09 218.98 260.3 258.2 260.3 282.62 224.71 288.85 204.71 290.54 177.18 285.08 163.55 276.77 155.76 240.94 155.76 238.91 167.5" fill="#424244" stroke="#272425" strokeMiterlimit="10" />
            <ellipse id="wheel-2" data-name="wheel" cx="202.36" cy="227.8" rx="6.83" ry="20.33" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <ellipse id="wheel-3" data-name="wheel" cx="186.02" cy="221.13" rx="6.4" ry="19.05" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <ellipse id="wheel-4" data-name="wheel" cx="171.61" cy="215.93" rx="6" ry="17.86" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <ellipse id="wheel-5" data-name="wheel" cx="158.96" cy="212.37" rx="5.71" ry="17" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="front_top" data-name="front top" points="51.47 149.81 241.96 149.81 219.72 130.35 250.92 130.35 234.86 118.31 156.9 118.31 165.12 126.19 55.21 126.19 51.47 149.81" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="front_bottom" data-name="front bottom" points="241.96 149.81 238.91 167.5 226.07 167.5 226.07 172.15 231.85 172.15 233.26 177.34 232.81 202.64 229.12 218.36 226.07 218.36 221.58 214.83 220.3 218.36 61.86 218.36 61.86 181.54 59.7 172.39 51.47 161.27 51.47 149.81 241.96 149.81" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="right_track_coupling" data-name="right track coupling" points="221.58 214.83 226.07 218.36 229.12 218.36 232.81 202.64 233.26 177.34 231.85 172.15 226.07 172.15 226.07 167.5 238.91 167.5 241.46 171.11 244.07 182.78 244.07 202.52 241.96 215.43 237.12 221.64 232.82 223.75 225.7 223.75 221.58 221.02 220.3 218.36 221.58 214.83" fill="#919396" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="left_track_coupling" data-name="left track coupling" points="51.47 221.13 51.47 161.27 59.7 172.39 61.86 181.54 61.86 218.36 58.37 218.36 56.88 221.13 51.47 221.13" fill="#919396" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="left_track" data-name="left track" points="51.47 151.9 1.96 151.9 0.5 155.74 0.5 215.68 5.41 254.39 10.31 265.26 48.63 265.26 51.47 231.32 51.47 151.9" fill="#424244" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="right_track_top_guard_thing" data-name="right track top guard thing" points="276.77 155.76 278.23 150.29 272.22 144.67 250.92 143.15 250.92 130.35 219.72 130.35 241.96 149.81 240.94 155.76 276.77 155.76" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="top_plating" data-name="top plating" points="9.29 151.9 3.46 144.71 21.9 107.44 21.9 97.15 81 97.15 81 109.78 85.02 113.81 152.83 113.81 156.9 118.31 165.12 126.19 55.21 126.19 51.47 151.9 9.29 151.9" fill="#919396" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="top_left" data-name="top left" points="47.17 97.15 62.05 58.95 88.48 58.95 88.48 113.81 85.02 113.81 81 109.78 81 97.15 47.17 97.15" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="top_right" data-name="top right" points="147.74 113.81 147.74 60.01 165.77 60.01 191.13 118.31 156.9 118.31 152.83 113.81 147.74 113.81" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <rect id="top_center" data-name="top center" x="88.48" y="62.18" width = "59.26" height = "51.63" fill="#6c6d70" stroke="#272425" strokeMiterlimit="10" />
            <circle id="barell_base" data-name="barell base" cx="118.11" cy="95.89" r = "9.51" fill="#424244" stroke="#272425" strokeMiterlimit="10" />
            <polyline id="barrel" points="110.22 90.58 156.39 21.69 180.98 37.99 124.09 103.28" fill="#424244" stroke="#272425" strokeMiterlimit="10" />
            <circle id="barrel_tip_back" data-name="barrel tip back" cx="163.48" cy="36.27" r = "23.74" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <polyline id="barrel_tip_sides" data-name="barrel tip sides" points="143.84 22.95 155.13 7.53 189.25 42.47 179.73 53.57" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <circle id="barrel_tip_front" data-name="barrel tip front" cx="172.19" cy="24.95" r = "24.45" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <circle id="barrel_hole" data-name="barrel hole" cx="172.19" cy="24.95" r = "17.06" fill="#272425" stroke="#272425" strokeMiterlimit="10" />
          </svg>
        )
      }}
    </Blitzkontext.Consumer>,
  fleet:
    <Blitzkontext.Consumer>
      {({map}) => {
        return (
          <svg width={map.unitSizing.fleet.width}
            height={map.unitSizing.fleet.height}
            viewBox="0 0 294.66 256.8"
          >
            <title>Fleet</title>
            <polygon id="lower_hull" data-name="lower hull" points="1.08 225.76 23.78 232.05 39.08 238.54 45.17 244.37 48.01 256.01 146.4 194.84 174.14 174.93 193.16 158.83 152.88 167.9 64.72 233.76 1.08 225.76" fill="#424244" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="flight_deck_bottom" data-name="flight deck bottom" points="1.08 225.76 64.72 233.76 152.88 167.9 221.63 152.42 240.65 130.67 240.68 120.94 293.61 62.23 264.85 60.01 273.7 48.27 206.99 47.42 181.63 59.84 172.28 59.33 56.73 138.63 69.66 157.69 1.08 225.76" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="flight_deck_side" data-name="flight deck side" points="273.7 48.27 273.7 39.27 264.85 51.01 264.85 60.01 273.7 48.27" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="flight_deck_side-2" data-name="flight deck side" points="56.73 129.63 56.73 138.63 69.66 157.69 69.66 148.69 56.73 129.63" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="flight_deck_top" data-name="flight deck top" points="1.08 216.76 64.72 224.76 152.88 158.9 221.63 143.42 240.65 121.67 240.68 111.94 293.61 53.23 264.85 51.01 273.7 39.27 206.99 38.42 181.63 50.84 172.28 50.33 56.73 129.63 69.66 148.69 1.08 216.76" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="flight_deck_side-3" data-name="flight deck side" points="293.61 53.23 293.61 62.23 240.68 120.94 240.68 111.94 293.61 53.23" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <rect x="142.21" y="59.27" width="15.3" height="18.1" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <polyline points="157.51 77.36 164.7 71.84 164.7 54.14 157.51 59.27" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <polygon points="138.55 61.79 160.37 61.79 161.97 49.29 130.64 49.29 138.55 61.79" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <polygon points="161.97 49.29 169.56 44.96 166.89 57.27 160.37 61.79 161.97 49.29" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <polygon points="169.56 44.96 140.83 44.96 130.64 49.29 161.97 49.29 169.56 44.96" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="antenae" points="136.54 4.91 136.54 6.99 150.65 6.99 150.65 26.89 135.87 26.89 136.77 27.79 150.65 27.79 150.65 46.59 153.4 46.59 153.4 27.79 164.81 27.79 166.34 26.89 153.4 26.89 153.4 6.99 163.82 6.99 162.97 4.91 153.4 4.91 153.4 1.24 150.65 0.62 150.65 4.91 136.54 4.91" fill="#424244" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="launch_stripe" data-name="launch stripe" points="104.34 127.73 99.64 127.73 9.13 217.77 14.27 218.42 104.34 127.73" fill="#eff0f0" />
            <polygon id="launch_stripe-2" data-name="launch stripe" points="150.01 131.07 145.07 131.07 50.06 222.92 54.42 223.46 150.01 131.07" fill="#eff0f0" />
            <polygon id="landing_stripe" data-name="landing stripe" points="216.67 38.54 155.03 158.42 164.7 156.24 221.99 38.63 216.67 38.54" fill="#eff0f0" />
            <polygon id="landing_stripe-2" data-name="landing stripe" points="210.94 145.82 249.36 38.96 254.48 39.03 218.46 144.13 210.94 145.82" fill="#eff0f0" />
            <polygon id="landing_stripe-3" data-name="landing stripe" points="235.05 38.78 186.36 151.36 189.04 150.76 236.79 38.8 235.05 38.78" fill="#eff0f0" />
            <polygon id="flight_deck_side-4" data-name="flight deck side" points="1.08 225.76 1.08 216.76 64.72 224.76 64.72 233.76 1.08 225.76" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="flight_deck_side-5" data-name="flight deck side" points="152.88 158.9 152.88 167.9 221.63 152.42 221.63 143.42 152.88 158.9" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
          </svg>
        )
      }}
    </Blitzkontext.Consumer>,
  wing:
    <Blitzkontext.Consumer>
      {({map}) => {
        return (
          <svg width={map.unitSizing.wing.width}
            height={map.unitSizing.wing.height}
          viewBox="0 0 291.8 222.97">
            <title>Wing</title>
            <polygon id="hull" points="31.34 222.32 42.42 218.47 50 214.74 57.58 209.99 70.59 199.36 84.5 186.46 97.62 171.87 128.72 173.4 156.79 147.07 164.41 147.07 168.62 140.25 160.68 129.52 192.84 92.43 195.95 94.58 198.1 93.39 215.44 69.38 195.21 71.53 188.85 74.26 185.41 71.18 181.11 68.75 177.25 67.82 173.03 68.11 167.59 69.18 162.36 68.11 159.42 64.88 156.06 62.52 151.26 61.16 149.14 61.16 144.99 61.57 149.39 59.25 139.31 49.47 113.5 71.21 111.61 75.68 78.08 107.11 61.49 110.71 57.25 117.11 60.52 120.3 41.73 148.67 57.27 159.94 50.52 169.05 43.36 179.18 38.45 187.67 34.16 196.16 30.78 204.65 29.54 210.13 29.86 216.67 31.34 222.32" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="right_wing_trim" data-name="right wing trim" points="168.62 140.25 164.41 147.07 283.35 144.49 291.16 131.87 276.61 118.09 271.29 125.66 270.66 125.24 276.02 117.75 250.43 105.68 244.79 113.27 244.03 112.71 249.74 105.41 217.53 94.22 211.62 94.46 168.62 140.25" fill="#a5a7a9" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="right_wing" data-name="right wing" points="168.62 140.25 277.54 139.11 284.07 130.19 274.31 121.26 271.29 125.66 270.66 125.24 273.9 121.02 248.41 108.4 244.79 113.27 244.09 112.76 247.67 108.06 211.62 94.46 195.95 94.58 192.84 92.43 160.68 129.52 168.62 140.25" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="right_stabilizer_trim" data-name="right stabilizer trim" points="215.44 69.38 236.58 69.38 266.42 81.98 259.18 90.67 198.1 93.39 215.44 69.38" fill="#a5a7a9" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="right_stabilizer" data-name="right stabilizer" points="253.73 88.24 200.5 90.08 213.09 72.65 236.29 72.31 258.77 82.16 253.73 88.24" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="right_fin" data-name="right fin" points="174.25 101.16 195.21 71.53 230.26 33.01 200.5 72.31 185.69 91.14 174.25 101.16" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="left_fin" data-name="left fin" points="110.63 85.21 98.83 9.91 108.87 0.79 141.06 57.62 130.89 68.73 120.94 77.75 110.63 85.21" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="left_stabilizer_trim" data-name="left stabilizer trim" points="107.47 65.06 82.55 44.19 91.11 36.08 103.04 36.8 107.47 65.06" fill="#a5a7a9" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="left_stabilizer" data-name="left stabilizer" points="95.81 39.13 89.7 44.45 106.45 58.54 103.46 39.45 95.81 39.13" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="left_wing_trim" data-name="left wing trim" points="57.25 117.11 0.7 66.93 10.1 56.26 33.12 53.51 28.98 57.41 30.15 57.8 33.89 53.51 63.15 56.53 58.86 61.15 59.63 61.54 64.03 56.81 104.1 64.39 107.91 67.88 109.45 77.7 78.08 107.11 61.49 110.71 57.25 117.11" fill="#a5a7a9" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="left_wing" data-name="left wing" points="61.49 110.71 6.9 66.08 14.36 57.55 30.38 56.09 28.98 57.41 30.15 57.8 32 55.67 60.9 58.96 58.86 61.15 59.63 61.54 61.92 59.08 107.91 67.88 109.45 77.7 78.08 107.11 61.49 110.71" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="right_intake" data-name="right intake" points="97.62 171.87 125.14 173.22 113.22 180.96 90.05 180.29 97.62 171.87" fill="#272425" />
            <polygon id="left_intake" data-name="left intake" points="45.27 151.24 57.27 159.94 55.37 162.51 45.27 151.24" fill="#272425" />
            <polygon id="cockpit" points="58.4 175.45 65.85 175.45 73.76 170.72 81.85 163.26 88.49 154.17 93.4 145.17 90.95 138.35 86.49 135.35 74.4 141.81 66.4 149.26 61.49 156.87 57.27 164.72 55.49 171.27 58.4 175.45" fill="#e4e5e6" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="Cockpit_shine" data-name="Cockpit shine" points="67.17 174.66 71.31 163.46 81.58 149.55 91.26 139.22 93.4 145.17 88.49 154.17 81.85 163.26 73.76 170.72 67.17 174.66" fill="#cfd0d2" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="fin_trim" data-name="fin trim" points="141.06 57.62 108.87 0.79 106.96 2.53 139.11 59.75 141.06 57.62" fill="#a5a7a9" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="engine_middle" data-name="engine middle" points="162.36 68.11 154.66 75.52 150.79 74.26 132.25 91.19 133.78 95.49 138.87 96.93 144.9 95.92 161.44 78.69 159.29 77.66 167.59 69.18 162.36 68.11" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="hull_detail" data-name="hull detail" points="105.88 117.34 125.49 123.39 124.29 113.97 117.65 112.32 105.88 117.34" fill="#424244" stroke="#272425" strokeMiterlimit="10" />
            <line x1="188.85" y1="74.26" x2="144.59" y2="125.16" fill="#e4e5e6" stroke="#272425" strokeMiterlimit="10" />
            <line x1="144.99" y1="61.57" x2="91.36" y2="110.71" fill="#e4e5e6" stroke="#272425" strokeMiterlimit="10" />
            <polyline points="97.62 171.87 105.88 163.3 116.83 147.68 123.74 133.16 125.49 123.39 105.88 117.34 86.41 130.81 69.95 144.6 57.27 159.94" fill="none" stroke="#272425" strokeMiterlimit="10" />
          </svg>
        )
      }}
    </Blitzkontext.Consumer>,
  nuke:
    <Blitzkontext.Consumer>
      {({map}) => {
        return (
          <svg width={map.unitSizing.nuke.width} height={map.unitSizing.nuke.height}
          viewBox="0 0 296.62 296.04">
            <title>Nuke</title>
            <rect id="rocket_rim" data-name="rocket rim" x="193.51" y="5.76" width="65.52" height="136.51" strokeMiterlimit="10" fill="#58595b" stroke="#272425" transform="translate(12.14 179.8) rotate(-45)" />
            <ellipse cx="95.9" cy="203.55" rx="114.24" ry="66.83" transform="translate(-117.64 125.55) rotate(-45)" fill="#424244" stroke="#272425" strokeMiterlimit="10" />
            <polygon points="152.23 87.93 82.94 126.13 169.65 212.84 208.54 144.25 214.78 108.77 187.7 81.69 152.23 87.93" fill="#6c6d70" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="top_fin" data-name="top fin" points="214.78 108.77 196.57 144.88 248.15 142.14 214.78 108.77" fill="#424244" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="bottom_fin" data-name="bottom fin" points="187.7 81.69 151.59 99.91 154.33 48.32 187.7 81.69" fill="#424244" stroke="#272425" strokeMiterlimit="10" />
            <path d="M102.91,281.89c-34.43,19-68.92,21.31-87.53,2.7S-1,231.76,17.86,197.45" transform="translate(-1.8 -1.88)" fill="#e42b2d" stroke="#272425" strokeMiterlimit="10" />
          </svg>
        )
      }}
    </Blitzkontext.Consumer>,
  detonation:
    <Blitzkontext.Consumer>
      {({map}) => {
        return (
          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 290.64 298.82">
            <defs>
              <radialGradient id="radial-gradient" cx="150.25" cy="262.47" r="144.1" gradientTransform="translate(-4.93 195.4) scale(1 0.25)" gradientUnits="userSpaceOnUse">
                <stop offset="0.46" stopColor="#e53a2d" />
                <stop offset="0.46" stopColor="#e13a2d" />
                <stop offset="0.47" stopColor="#b6352b" />
                <stop offset="0.48" stopColor="#8f3029" />
                <stop offset="0.48" stopColor="#6f2c28" />
                <stop offset="0.49" stopColor="#552927" />
                <stop offset="0.5" stopColor="#402726" />
                <stop offset="0.52" stopColor="#322525" />
                <stop offset="0.53" stopColor="#2a2425" />
                <stop offset="0.55" stopColor="#272425" />
                <stop offset="0.68" stopColor="#272425" />
                <stop offset="0.7" stopColor="#272425" />
                <stop offset="0.81" stopColor="#292425" />
                <stop offset="0.86" stopColor="#302425" />
                <stop offset="0.88" stopColor="#3b2526" />
                <stop offset="0.91" stopColor="#4c2527" />
                <stop offset="0.93" stopColor="#622628" />
                <stop offset="0.95" stopColor="#7e2729" />
                <stop offset="0.96" stopColor="#9e282b" />
                <stop offset="0.98" stopColor="#c22a2c" />
                <stop offset="0.99" stopColor="#e42b2e" />
                <stop offset="1" stopColor="#272425" />
              </radialGradient>
              <linearGradient id="linear-gradient" x1="-80.14" y1="261.02" x2="-79.55" y2="261.02" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#fef740" />
                <stop offset="0.04" stopColor="#fceb37" />
                <stop offset="0.12" stopColor="#f9d829" />
                <stop offset="0.2" stopColor="#f7cd21" />
                <stop offset="0.28" stopColor="#f6c91e" />
                <stop offset="0.67" stopColor="#eb9243" />
                <stop offset="0.89" stopColor="#e46c41" />
                <stop offset="1" stopColor="#e0453e" />
              </linearGradient>
              <radialGradient id="radial-gradient-2" cx="181.86" cy="174.45" r="66.13" href="#linear-gradient" />
              <radialGradient id="radial-gradient-3" cx="118.63" cy="174.45" r="66.13" href="#linear-gradient" />
              <radialGradient id="radial-gradient-4" cx="149.82" cy="78.46" fx="79.5504253733004" r="75.76" gradientTransform="matrix(0, 0.95, -1.45, 0, 258.3, -67.76)" gradientUnits="userSpaceOnUse">
                <stop offset="0.04" stopColor="#e42b2d" />
                <stop offset="0.07" stopColor="#e63e2c" />
                <stop offset="0.13" stopColor="#ea702b" />
                <stop offset="0.15" stopColor="#e9682b" />
                <stop offset="0.18" stopColor="#e8542c" />
                <stop offset="0.22" stopColor="#e5322d" />
                <stop offset="0.23" stopColor="#e42c2d" />
                <stop offset="0.3" stopColor="#e85229" stopOpacity="0.88" />
                <stop offset="0.4" stopColor="#ee8624" stopOpacity="0.71" />
                <stop offset="0.51" stopColor="#f3ab21" stopOpacity="0.6" />
                <stop offset="0.6" stopColor="#f5c11f" stopOpacity="0.52" />
                <stop offset="0.68" stopColor="#f6c91e" stopOpacity="0.5" />
                <stop offset="0.68" stopColor="#f6c91e" stopOpacity="0.5" />
                <stop offset="0.71" stopColor="#f6c91e" stopOpacity="0.5" />
                <stop offset="0.72" stopColor="#f4ba1f" stopOpacity="0.55" />
                <stop offset="0.79" stopColor="#ed7d25" stopOpacity="0.74" />
                <stop offset="0.85" stopColor="#e85029" stopOpacity="0.88" />
                <stop offset="0.9" stopColor="#e5352c" stopOpacity="0.97" />
                <stop offset="0.94" stopColor="#e42b2d" />
                <stop offset="0.98" stopColor="#fefefe" />
              </radialGradient>
            </defs>
            <ellipse id="Outer_Shockwave_Ring" data-name="Outer Shockwave Ring" cx="145.32" cy="261.02" rx="145.32" ry="37.79" fill="url(#radial-gradient)" />
            <ellipse id="Cloud_Pillar_Base" data-name="Cloud Pillar Base" cx="145.32" cy="261.02" rx="63.23" ry="16.44" fill="url(#linear-gradient)" />
            <path id="Cloud_Right" data-name="Cloud Right" d="M213.48,262.47c-19.78-39.62-39.38-20-46.83-120.93-4.09-55.37-16.4-55.11-16.4-55.11v176Z" transform="translate(-4.93 -1.44)" fill="url(#radial-gradient-2)" />
            <path id="Cloud_Left" data-name="Cloud Left" d="M87,262.47c19.78-39.62,39.38-20,46.82-120.93,4.09-55.37,16.41-55.11,16.41-55.11v176Z" transform="translate(-4.93 -1.44)" fill="url(#radial-gradient-3)" />
            <ellipse cx="145.32" cy="99.63" rx="119.2" ry="65.39" fill="#fefefe" />
            <ellipse id="Base" cx="145.32" cy="80.75" rx="106.59" ry="80.75" fill="#fefefe" />
            <ellipse cx="145.32" cy="79.1" rx="106.59" ry="76.75" fill="url(#radial-gradient-4)" />
            <path d="M31,101.08c0,40.29,61,65.38,119.21,65.38s119.2-24.54,119.2-65.38H253.91s-20.7,47.25-103.66,47.25S46.59,101.08,46.59,101.08Z" transform="translate(-4.93 -1.44)" fill="#fefefe" />
            <ellipse cx="145.32" cy="39.33" rx="63.23" ry="38.15" fill="#fefefe" />
          </svg>
        )
      }}
    </Blitzkontext.Consumer>,
  garrison:
    <Blitzkontext.Consumer>
      {({map}) => {
        return (
          <svg width={map.unitSizing.garrison.width} height={map.unitSizing.garrison.height}
          viewBox="0 0 301.05 300.92">
            <title>Garrison</title>
            <polygon id="TLS" points="150.53 0.66 114.64 10.82 105.83 168.01 150.53 168.01 150.53 0.66" fill="#eff0f0" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="TRS" points="150.78 0.66 186.67 10.81 195.48 168.01 150.78 168.01 150.78 0.66" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="MRC" points="162.19 87.2 156.53 168.25 206.26 174.49 206.26 76.69 162.19 87.2" fill="#cfd0d2" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="MRO" points="206.26 76.69 242.15 86.84 250.96 169.85 206.26 174.49 206.26 76.69" fill="#6c6d70" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="MLC" points="138.86 87.2 144.53 168.25 94.79 174.49 94.79 76.69 138.86 87.2" fill="#6c6d70" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="MLO" points="94.79 76.69 58.9 86.84 50.09 169.85 94.79 174.49 94.79 76.69" fill="#e4e5e6" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="DLC" points="76.64 168.01 81.5 290.82 38.85 300.26 38.85 152.09 76.64 168.01" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="DLO" points="38.85 152.09 8.08 167.47 0.53 293.25 38.85 300.26 38.85 152.09" fill="#cfd0d2" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="DRC" points="224.41 168.01 219.56 290.82 262.2 300.26 262.2 152.09 224.41 168.01" fill="#cfd0d2" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="DRO" points="262.2 152.09 292.97 167.47 300.53 293.25 262.2 300.26 262.2 152.09" fill="#7f8083" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="DCW" points="76.64 168.01 224.41 168.01 219.56 290.82 81.5 290.82 76.64 168.01" fill="#babbbe" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="TLS-2" data-name="TLS" points="150.43 184.71 123.25 191.33 116.58 290.78 150.43 300.26 150.43 184.71" fill="#a5a7a9" stroke="#272425" strokeMiterlimit="10" />
            <polygon id="TRS-2" data-name="TRS" points="150.62 184.71 177.8 191.32 184.48 290.78 150.62 300.26 150.62 184.71" fill="#58595b" stroke="#272425" strokeMiterlimit="10" />
          </svg>
        )
      }}
    </Blitzkontext.Consumer>
}