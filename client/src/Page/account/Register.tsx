import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../api/agent';
import { toast } from 'react-toastify';
import { Container } from '@mui/material';


export default function Register() {
    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({ mode: 'all' });

    const handleApiError = (errors: any) => {
        errors.forEach((error: string) => {
            if (error.includes('Password')) {
                setError('password', { message: error })
            } else if (error.includes('Email')) {
                setError('email', { message: error })
            }
            else if (error.includes('Username')) {
                setError('username', { message: error })
            }
        });

    }
    const submitForm = async (data: FieldValues) => {
        try {
            await agent.account.register(data);
            toast.success("Registration Successful");
            navigate('/login')
        } catch (error: any) {
            handleApiError(error)
        }
        // navigate('/catalog')
    }

    return (
        <Container>
            <Grid container component="main" sx={{ height: '100vh' }}>

                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(submitForm)}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                                {...register("username", {
                                    required: "Username is required",
                                    pattern: {
                                        value: /^([a-zA-Z])[a-zA-Z_-]*[\w_-]*[\S]$|^([a-zA-Z])[0-9_-]*[\S]$|^[a-zA-Z]*[\S]$/,
                                        message: 'Username name should not contain a space or nonalphanumerical character'
                                    }
                                })}
                                error={!!errors?.username}
                                helperText={errors?.username?.message}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                {...register("email", {
                                    required: "User email is required", pattern: {
                                        value: /^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$/,
                                        message: 'Not a valide email'
                                    }
                                })}
                                error={!!errors?.email}
                                helperText={errors?.email?.message}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                {...register("password", {
                                    required: 'Password is required', pattern: {
                                        value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                                        message: 'Password length should be 6-10 characters and contain at least 1 digit'
                                    }
                                })}
                                error={!!errors?.password}
                                helperText={errors?.password?.message}
                            />

                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <LoadingButton
                                loading={isSubmitting}
                                disabled={!isValid}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </LoadingButton>
                            <Grid container>

                                <Grid item>
                                    <Link to="/login" >
                                        {"Already have an account? Sign in"}
                                    </Link>
                                </Grid>
                            </Grid>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}