import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, Outlet } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  CircularProgress,
  Container,
  Stack,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState({});

  const fetchAdminDetails = async () => {
    try {
      setLoading(true);
      const responseFromServer = await axios.get(
        `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/adminPortal/admin/profile`,
        { withCredentials: true }
      );
      setAdminData(responseFromServer.data.admin);
      setLoading(false);
    } catch (er) {
      setLoading(false);
    }
  };

  const sahyogForm = useForm();
  const vyawasthaForm = useForm();
  const vyawasthaComp = useForm();
  const sahyogComp = useForm();

  const sahyogHandler = async (data) => {
    try {
      await toast.promise(
        axios.post(
          `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/adminPortal/admin/createSahyog`,
          data,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        ),
        {
          loading: 'Creating Sahyog',
          success: <b>Sahyog Created Successfully!</b>,
          error: <b>Error in Creating the Sahyog</b>,
        }
      );
      sahyogForm.reset();
    } catch (e) {
      toast.error('Something went wrong');
    }
  };

  const vyawasthaHandler = async (data) => {
    try {
      await toast.promise(
        axios.post(
          `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/adminPortal/admin/createVyawastha`,
          data,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        ),
        {
          loading: 'Creating Vyawastha',
          success: <b>Vyawastha Created Successfully!</b>,
          error: <b>Error in Creating the Vyawastha</b>,
        }
      );
      vyawasthaForm.reset();
    } catch (e) {
      toast.error('Something went wrong');
    }
  };

  const handleSahyogComp = async (data) => {
    try {
      await toast.promise(
        axios.post(
          `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/adminPortal/admin/sahyogComp`,
          data,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        ),
        {
          loading: 'Marking as complete',
          success: <b>Marked as complete</b>,
          error: <b>Some error occurred</b>,
        }
      );
    } catch (gal) {
      toast.error('Please try again later');
    }
  };

  const handleVyawasthaComp = async (data) => {
    try {
      await toast.promise(
        axios.post(
          `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/adminPortal/admin/vyawasthaComp`,
          data,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        ),
        {
          loading: 'Marking as complete',
          success: <b>Marked as complete</b>,
          error: <b>Some error occurred</b>,
        }
      );
    } catch (gal) {
      toast.error('Please try again later');
    }
  };

  const logoutHandler = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/adminPortal/admin/logout`,
        null,
        { withCredentials: true }
      );
      navigate('/');
      toast.success('Logged out successfully');
    } catch (e) {
      navigate('/');
      toast.success('Logged out successfully');
    }
  };

  useEffect(() => {
    fetchAdminDetails();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Box
        minHeight="70vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ background: '#f4f6f8', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button
            color="inherit"
            startIcon={<HelpOutlineIcon />}
            onClick={() => navigate('/admin/dashboard/adminHelp')}
          >
            Admin HelpDesk
          </Button>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Admin Dashboard
          </Typography>
          <Button
            color="inherit"
            endIcon={<LogoutIcon />}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          align="center"
          color="primary"
          fontWeight={700}
          gutterBottom
        >
          Welcome, {adminData.name}
        </Typography>

        <Grid container spacing={4}>
          {/* Sahyog Form */}
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Add New Sahyog
                </Typography>
                <Box
                  component="form"
                  onSubmit={sahyogForm.handleSubmit(sahyogHandler)}
                  noValidate
                  autoComplete="off"
                >
                  <Stack spacing={2}>
                    <TextField
                      label="User Object ID"
                      variant="outlined"
                      fullWidth
                      {...sahyogForm.register('user')}
                    />
                    <TextField
                      label="Sahyog Name"
                      variant="outlined"
                      fullWidth
                      {...sahyogForm.register('name')}
                    />
                    <TextField
                      label="Description"
                      variant="outlined"
                      fullWidth
                      {...sahyogForm.register('description')}
                    />
                    <TextField
                      label="Amount"
                      variant="outlined"
                      fullWidth
                      {...sahyogForm.register('amount')}
                    />
                    <TextField
                      label="Nominee Name"
                      variant="outlined"
                      fullWidth
                      {...sahyogForm.register('nomineeName')}
                    />
                    <TextField
                      label="Nominee Account No. 1"
                      variant="outlined"
                      fullWidth
                      {...sahyogForm.register('nomineeAccount1No')}
                    />
                    <TextField
                      label="Nominee Account 1 IFSC"
                      variant="outlined"
                      fullWidth
                      {...sahyogForm.register('nomineeAccount1ifsc')}
                    />
                    <TextField
                      label="Nominee Account No. 2"
                      variant="outlined"
                      fullWidth
                      {...sahyogForm.register('nomineeAccount2No')}
                    />
                    <TextField
                      label="Nominee Account 2 IFSC"
                      variant="outlined"
                      fullWidth
                      {...sahyogForm.register('nomineeAccount2ifsc')}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Create Sahyog
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Vyawastha Form */}
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Add New Vyawastha Shulk
                </Typography>
                <Box
                  component="form"
                  onSubmit={vyawasthaForm.handleSubmit(vyawasthaHandler)}
                  noValidate
                  autoComplete="off"
                >
                  <Stack spacing={2}>
                    <TextField
                      label="Vyawastha Name"
                      variant="outlined"
                      fullWidth
                      {...vyawasthaForm.register('name')}
                    />
                    <TextField
                      label="Description"
                      variant="outlined"
                      fullWidth
                      {...vyawasthaForm.register('description')}
                    />
                    <TextField
                      label="Amount"
                      variant="outlined"
                      fullWidth
                      {...vyawasthaForm.register('amount')}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Create Vyawastha
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Mark Sahyog as Completed */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Mark Sahyog as Completed
                </Typography>
                <Box
                  component="form"
                  onSubmit={sahyogComp.handleSubmit(handleSahyogComp)}
                  noValidate
                  autoComplete="off"
                >
                  <Stack spacing={2}>
                    <TextField
                      label="Sahyog Object ID"
                      variant="outlined"
                      fullWidth
                      {...sahyogComp.register('id')}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      size="large"
                    >
                      Mark as Completed
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Mark Vyawastha as Completed */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Mark Vyawastha as Completed
                </Typography>
                <Box
                  component="form"
                  onSubmit={vyawasthaComp.handleSubmit(handleVyawasthaComp)}
                  noValidate
                  autoComplete="off"
                >
                  <Stack spacing={2}>
                    <TextField
                      label="Vyawastha Object ID"
                      variant="outlined"
                      fullWidth
                      {...vyawasthaComp.register('id')}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      size="large"
                    >
                      Mark as Completed
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardAdmin;
