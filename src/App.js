import { useEffect, useState } from 'react';
import GOLGrid from './components/GOLGrid';
import GOLMenu from './components/GOLMenu';
import Grid from './simulation/grid';
import './App.css';

function App() {
  const [grid, setGrid] = useState(new Grid(40,40,200));
  return (
    <div className="App">
      <GOLMenu grid={grid}/>
      <GOLGrid grid={grid}/>
    </div>
  );
}

export default App;
