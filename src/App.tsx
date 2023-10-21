import clsx from 'clsx';
import './App.css';
import AppWrapper from './navigation/AppWrapper';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {

  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  // Whenever the user explicitly chooses light mode
  localStorage.theme = 'light'

  // Whenever the user explicitly chooses dark mode
  localStorage.theme = 'dark'

  let colorMode = 'light';

  const queryClient = new QueryClient();

  return (
    <div className={clsx('flex flex-col min-h-screen bg-white text-black dark:bg-slate-800 dark:text-white ')}>
      <QueryClientProvider client={queryClient}>
        <AppWrapper />
      </QueryClientProvider>

    </div>
  );
}

export default App;
