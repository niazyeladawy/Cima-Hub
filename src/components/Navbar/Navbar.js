import *  as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate  = useNavigate();

  
  useEffect(() => {
    if(value ===0) navigate("/");
    else if(value ===1) navigate("/movies");
    else if(value ===2) navigate("/series");
    else if(value ===3) navigate("/search");
    
  }, [value])
  return (
    <Box sx={{ width: "100%", position:"fixed",bottom:0 , backgroundColor:"#2D313A",zIndex:100 }}>
      <BottomNavigation sx={{  backgroundColor:"#2D313A"}}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Trending" style={{color:"#fff"}} icon={<WhatshotIcon />} />
        <BottomNavigationAction label="Movies" style={{color:"#fff"}} icon={<MovieIcon />} />
        <BottomNavigationAction label="Tv Series" style={{color:"#fff"}} icon={<PersonalVideoIcon />} />
        <BottomNavigationAction label="Search" style={{color:"#fff"}} icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}