import { Box } from '@mui/material';
import Navbar from '../components/navbar/Navbar';
import AppRoutes from '../routes/AppRoutes';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import clsx from 'clsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IntlProvider } from 'react-intl';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
interface WrapperProps {
}

export default function AppWrapper(props: WrapperProps) {
    const theme = useTheme();
    let colorMode = 'dark' // "light" or "dark"
    const queryClient = new QueryClient()

    return (

        <IntlProvider locale='us' >
            <ThemeProvider theme={darkTheme}>
                <QueryClientProvider client={queryClient}>
                    <main>
                        <nav className=' w-full z-[1050] p - 0' >
                            <Navbar dark={colorMode === 'dark'} username='faisalamin' />
                        </nav >
                        <div>
                            <AppRoutes />
                        </div>
                    </main >
                </QueryClientProvider>
            </ThemeProvider>
        </IntlProvider>
    )
}
