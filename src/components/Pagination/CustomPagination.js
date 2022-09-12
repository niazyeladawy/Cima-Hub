import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import './CustomPagination.css';
import { purple } from '@mui/material/colors';


const darkTheme = createTheme({
    palette: {
       
        mode: 'dark',
        primary: {
            // Purple and green play nicely together.
            main: purple[500],
          },
    },
})

const CustomPagination = ({ setPage ,numberOFPages=20 }) => {


    const handlePageChange = (event,page) => {
        setPage(page);
        window.scroll(0, 0);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="paginationc">
                <Pagination count={numberOFPages} color="primary" onChange={handlePageChange} />
            </div>
        </ThemeProvider>

    )
}

export default CustomPagination
