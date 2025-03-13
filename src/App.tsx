import "./App.css";
import { createSignal, onCleanup, createEffect, onMount } from "solid-js";
import { checkForAppUpdates } from "./updater";
import horse from "./assets/horse.png";

function App() {
  onMount(async () => {
    await checkForAppUpdates();
  });

  let horseRef: HTMLDivElement;

  type Position = {
    x: number;
    y: number;
  };

  const [position, setPosition] = createSignal({ x: 960, y: 540 });

  // I'll set up screen size detection later
  const getRandomPosition = (): Position => {
    return {
      x: Math.random() * (1920 - 175),
      y: Math.random() * (1080 - 150), 
    };
  };

  createEffect(() => {
    const interval = setInterval(() => {
      setPosition(getRandomPosition());
    }, 1000);

    onCleanup(() => clearInterval(interval));
  });

  const calculateStyle = (position: Position) => {
    return `position: absolute; left: ${position.x}px; top: ${position.y}px; 
    animation-timing-function: ease-in-out;
    transition: top 1s, left 1s;
  `;
  };

  return (
    <div class="container">
      <div style={calculateStyle(position())} ref={horseRef}>
        <img class="horse" width={175} src={horse} />
      </div>
    </div>
  );
}

export default App;