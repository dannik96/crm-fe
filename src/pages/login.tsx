import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useState } from 'react';

const theme = createTheme();

export default function SignIn() {
    const router = useRouter();
    const [error, setError] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('login'),
            password: data.get('password'),
        });

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    username: data.get('login'),
                    password: data.get('password'),
                })
            })

            if (res.ok) {
                const json = await res.json()

                localStorage.setItem('token', json.token)
                localStorage.setItem('id', json.id)
                localStorage.setItem('username', json.username)
                localStorage.setItem('roles', json.roles)

                if (localStorage.getItem('prevPage'))
                    router.back();
                else {
                    router.replace('/projects/projects');
                }
            } else if (res.status === 401) {
                setError(true);
            } else {
                console.log("error occured")
            }
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Login"
                            name="login"
                            autoFocus
                            error={error}
                        />
                        <TextField
                            margin="normal"
                            required
                            error={error}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}