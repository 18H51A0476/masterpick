import React,{useEffect} from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '82.3vh', // Set full screen height
    backgroundColor: '#354f52', // Blackish-green background color
  },
}));


const Leaderboard = () => {
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles()
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className={classes.root}>
    {" "}
    {loading ? <CircularProgress size={60} /> : <h1>Leaderboard</h1>}
  </div>
  )
}

export default Leaderboard