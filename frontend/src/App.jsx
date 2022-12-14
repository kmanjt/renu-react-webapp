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
      <main style={{ backgrounColor:"#9fb5af"}}>
        <Appbar />
        
      </main>
    </React.Fragment>
  );
}

export default App;
