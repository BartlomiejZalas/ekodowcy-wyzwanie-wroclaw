import React from 'react';
import {useState} from 'react';
import {Button} from '@mui/material';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Button variant="outlined" onClick={() => setCount(c => c + 1)}>
        Hello World {count}
      </Button>
    </div>
  );
}

export default App;
