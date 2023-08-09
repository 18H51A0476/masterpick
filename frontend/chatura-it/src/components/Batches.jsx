import React,{useEffect} from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from '@mui/material';


const Batches = () => {
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
    {loading ? 
        <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <CircularProgress size={60} />
        </Container>:<div>batches</div>}
    </>
  )
}

export default Batches