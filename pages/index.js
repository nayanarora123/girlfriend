import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { Moon, Sun } from "react-feather";
import Weather from "../components/weather/Weather";
import axios from "axios";
import Preloader from "../components/Preloader";
import Footer from "../components/Footer";

export default function Home() {


  const [dark, setDark] = useState(true);
  const [days, setDays] = useState([undefined, undefined, undefined, undefined, undefined]);
  const [compliment, setCompliment] = useState("");
  const audioRef = useRef();
  const [playing, setPlay] = useState(0);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const images = [
    '/pics/1.jpeg',
    '/pics/2.jpeg',
    '/pics/3.jpeg',
    '/pics/4.jpeg',
    '/pics/5.jpeg',
    '/pics/6.jpeg',
    '/pics/7.jpeg',
    '/pics/8.jpeg',
    '/pics/9.jpeg',
    '/pics/10.jpeg',
    '/pics/11.jpeg',
    '/pics/12.jpeg',
    '/pics/13.jpeg',
    '/pics/14.jpeg',
    '/pics/15.jpeg',
    '/pics/16.jpeg',
  ];

  const play = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlay(0);
      } else {
        audioRef.current.play();
        setPlay(1);
      }
    }
  }

  useEffect(() => {
    setDark(window.localStorage.getItem("theme") === "dark");
    axios.get("/api/compliment").then((res) => {
      setCompliment(res.data.compliment)
    })
    axios.get(`/api/weather`).then((res) => {
      setDays(res.data.days);
    });

    // Interval to change compliment every 3 seconds
    const interval = setInterval(() => {
      axios.get("/api/compliment").then((res) => {
        setCompliment(res.data.compliment);
      });
    }, 2000);

    const bgInterval = setInterval(() => {
      if (playing) {
        setBackgroundIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 4000);

    // Cleanup function to stop music when component unmounts
    return () => {
      clearInterval(interval);
      clearInterval(bgInterval);
    };
  }, [images.length, playing]);

  const [val, setVal] = useState(0);
  const [day, setDay] = useState(0);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const start = new Date(2024, 1, 25, 18, 30);

    const timer = setInterval(() => {
      const t = new Date() - start;
      const d = Math.floor(t / 1000 / 60 / 60 / 24);
      let h = Math.floor((t / 1000 / 60 / 60) % 24);
      let m = Math.floor((t / 1000 / 60) % 60);
      let s = Math.floor((t / 1000) % 60);

      if (h < 10) h = "0" + h;
      if (m < 10) m = "0" + m;
      if (s < 10) s = "0" + s;

      setDay(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
      setOpacity(1);
    }, 100);

    const fadeInterval = setInterval(() => {
      if (val < 1) {
        setVal(val + 0.025);
        setOpacity(val);
      } else {
        clearInterval(fadeInterval);
      }
    }, 50);

    return () => {
      clearInterval(timer);
      clearInterval(fadeInterval);
    };
  }, [val]);

  if (compliment.length === 0) {
    return <Preloader dark={dark} />
  }

  const divStyle = {
    width: '100vw',
    height: '100%',
    backgroundImage: `url(${images[backgroundIndex]})`,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    backgroundSize: 'inherit',
    backgroundPosition: 'center',
    filter: 'grayscale(60%)',
  };

  return (
    <div className={`container ${dark ? "dark" : ""}`} style={divStyle}>
      <Head>
        <title>Hey Cutie</title>
        <link sizes="96x96" type="image/png" rel="icon" href="/pics/icons8-cupcake-96.png" />
      </Head>

      <main>
        <div style={{ display: 'flex' }}>
          <h1 className="title">Hi, My Charan Cutie 🥧!
          </h1>
          <div className="toggle-container">
            {dark ?
              <Sun width="30px" height="30px"
                onClick={() => {
                  window.localStorage.setItem("theme", "light");
                  setDark(false);

                }}
              />
              : <Moon width="30px" height="30px"
                onClick={() => {
                  window.localStorage.setItem("theme", "dark");
                  setDark(true);
                }}
              />
            }
          </div>
        </div>

        <p className="description">Hope you're having a great day Babe. I Love You 💕 !</p>
        {/* Here are sweet little cupcakes for you! */}

        <div style={{ opacity }} className="anniversary">
          {day ?
            <>
              <h2 id="together">We have been together since 🫂</h2>
              <div className="anniversary-children">
                <div>{day} Days</div>
                <div>{hours} Hours</div>
                <div>{minutes} Minutes</div>
                <div>{seconds} Seconds</div>
              </div>
            </>
            : 'I Love You Babe'}
        </div>

        <code className={`${dark ? "dark-code" : ""} compliment`}>
          Always Remember Charan: {compliment}
        </code>
        <button className="audio-btn" onClick={play}>{!playing ? 'Play' : 'Pause'}</button>

        <Weather days={days} dark={dark} />
        <audio className="hidden" controls ref={audioRef}>
          <source src='/music.mp3' type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
        {/* <LinkGrid dark={dark}/> */}
      </main>
      <Footer dark={dark} />
      <style jsx>{`
        .dark {
          background: #212121;
          color: white;
        }

        .dark-code {
          color: black;
        }
        
        code:hover,
        code:active,
        code:focus {
          color: #F687B3;
          border-color: #F687B3;
        }

        .dark-code:hover,
        .dark-code:active,
        .dark-code:focus {
          background: #ED64A6;
          border-color: #ED64A6;
          color: black;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .compliment {
          cursor: pointer;
        }

        .toggle-container {
          padding-bottom: 25px;
        }

        main {
          padding: 2.5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .logo {
          height: 1em;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}
      </style>
    </div>
  );
}

