import './App.css';
import * as React from 'react';
import Appbar from './components/Appbar';
import icon from './assets/favicon.ico';

function App() {
    useEffect(() => {
    const favicon = document.getElementById('favicon');
    favicon.setAttribute('href', icon);
}, []);
  
  return (
    <React.Fragment>
      <main>
        <Appbar />
        
      </main>
    </React.Fragment>
  );
}

export default App;
