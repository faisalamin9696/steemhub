import clsx from 'clsx';
import './App.css';
import AppWrapper from './navigation/AppWrapper';

function App() {

  const colorMode = 'dark';
  return (
    <div className={clsx('flex flex-col min-h-screen',
      colorMode === 'dark' ? 'bg-slate-800 text-white' :
        'bg-white text-black')}>
      <AppWrapper />

    </div>
  );
}

export default App;
