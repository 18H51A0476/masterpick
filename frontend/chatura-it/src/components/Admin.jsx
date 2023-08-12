import React, { useEffect } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PeopleAlt, BatchPrediction, School } from '@mui/icons-material';

const Admin = () => {
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#354f52',
      color: 'white',
      padding: '16px', // Add space between cards
    }}>
      {loading ? (
        <CircularProgress size={60} />
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center', // Center cards horizontally
          gap: '16px', // Add space between cards
        }}>
          <Card component={Link} to="/user-management" style={{
            flex: 'calc(50% - 16px)', // Two cards per row with space in between
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: '#2B3945',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'white',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}>
            <CardContent style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <PeopleAlt style={{ fontSize: '48px', marginBottom: '8px' }} />
              <Typography variant="h6" gutterBottom>
                User Management
              </Typography>
            </CardContent>
          </Card>
          <Card component={Link} to="/batch-management" style={{
            flex: 'calc(50% - 16px)', // Two cards per row with space in between
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: '#2B3945',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'white',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}>
            <CardContent style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <BatchPrediction style={{ fontSize: '48px', marginBottom: '8px' }} />
              <Typography variant="h6" gutterBottom>
                Batch Management
              </Typography>
            </CardContent>
          </Card>
          <Card component={Link} to="/college-management" style={{
            flex: 'calc(50% - 16px)', // Two cards per row with space in between
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: '#2B3945',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'white',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}>
            <CardContent style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <School style={{ fontSize: '48px', marginBottom: '8px' }} />
              <Typography variant="h6" gutterBottom>
                College Management
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Admin;
