import './App.css';
import { useEffect } from 'react';
import Appbar from './components/Appbar';
import icon from './assets/favicon.ico';

function App() {
    useEffect(() => {
    const favicon = document.getElementById('favicon');
    favicon.setAttribute('href', icon);
}, []);
  
  return (
    <div>
    <Appbar />
      <p> Hello World </p>
    </div>
  );
}

export default App;
