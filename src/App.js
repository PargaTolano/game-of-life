import { useEffect, useState } from 'react';
import GOLGrid from './components/GOLGrid';
import GOLMenu from './components/GOLMenu';
import CanvasGrid from './components/GanvasGrid';
import Grid from './simulation/grid';
import './App.css';

function App() {
  const [grid, _] = useState(()=>new Grid(20,20));
  return (
    <div className="App">
      <GOLMenu grid={grid}/>
      <CanvasGrid grid={grid}/>
    </div>
  );
}

export default App;
