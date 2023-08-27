import { Box } from '@mui/material';
import Navbar from '../components/navbar/Navbar';
import AppRoutes from '../pages/routes/AppRoutes';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import clsx from 'clsx';


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

    return (<ThemeProvider theme={darkTheme}>
        <main>
            <nav className=' w-full z-[1050] p - 0' >
                <Navbar dark={colorMode === 'dark'} username='faisalamin' />
            </nav >
            <div>
                <AppRoutes />
            </div>
        </main >
    </ThemeProvider>
    )
}
