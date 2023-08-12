import React,{useEffect} from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from '@mui/material';
import apiService from '../http/ApiService';
const Profile = () => {
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    setLoading(true)
    apiService.get("/user/profile").then((data)=>{
      console.log("User Data:",data)
      setLoading(false)
    })
    .catch((err)=>{
      setLoading(false)
      console.error("Error: ",err)
    })
  }, []);
  return (
    <>
    {loading ? 
        <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <CircularProgress size={60} />
        </Container>:<div>Profile</div>}
    </>
  )
}

export default Profile