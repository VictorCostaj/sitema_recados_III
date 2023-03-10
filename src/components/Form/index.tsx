import React, { useEffect, useState } from 'react';
import { InputDefault, InputName } from '../InputDefault';
import { Stack, Button, Box, Typography, Grid, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { adicionarNovoUsuario, buscarUsuarios } from '../../store/modules/users/usersSlice';
import { setUsuarioLogado } from '../../store/modules/userLogged/userLoggedSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ImagemBanner } from '../../components/BannerImage/ImagemBanner'

interface FormProps {
    mode: 'login' | 'signup';
}


function Form({ mode }: FormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const usersRedux = useAppSelector(buscarUsuarios);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();


    const handleValidateInput = (value: string, key: InputName) => {
        switch (key) {
            case 'name':
                if (value.length < 3) {
                    setErrorName(true);
                } else {
                    setErrorName(false);
                }
                break;

            case 'email':
                // eslint-disable-next-line no-useless-escape
                const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if (!value.match(regexEmail)) {
                    setErrorEmail(true)
                } else {
                    setErrorEmail(false)
                }
                break;

            case 'password':
                if (mode === 'signup') {
                    if (!value || value.length < 6) {
                        setErrorPassword(true)

                    } else {
                        setErrorPassword(false)
                    }
                }

                if (mode === 'login') {
                    if (!value) {
                        setErrorPassword(true)
                    } else {
                        setErrorPassword(false)
                    }
                }
                break;

            case 'repassword':
                if (value !== password) {
                    setErrorPassword(true)
                } else {
                    setErrorPassword(false)
                }
                break

            default:
        }
    }

    const mudarInput = (value: string, key: InputName) => {
        switch (key) {
            case 'name':
                setName(value)
                handleValidateInput(value, key)
                break;

            case 'email':
                setEmail(value)
                handleValidateInput(value, key)
                break;

            case 'password':
                setPassword(value)
                handleValidateInput(value, key)
                break;

            case 'repassword':
                setRepassword(value)
                handleValidateInput(value, key)
                break

            default:
        }
    }

    const handleNavigate = () => {
        if (mode === 'login') {
            navigate('/signup')
        } else {
            navigate('/')
        }
    }


    const createAccount = () => {
        const newUser = {
            name,
            email,
            password,
            recados: []
        }

        const userExist = usersRedux.some((user) => user.email === newUser.email);

        if (!userExist) {
            dispatch(adicionarNovoUsuario(newUser))
            clearInputs();
            alert("Usu??rio Cadastrado! Voc?? ser?? redirecionado");

            setTimeout(() => {
                navigate('/')
            }, 1500)
        } else {
            alert('E-mail j?? em uso!')
        }

    }

    const login = () => {
        const userExist = usersRedux.find((user) => user.email === email && user.password === password);

        if (!userExist) {
            const confirma = window.confirm("Usu??rio n??o cadastrado. Deseja cadastrar uma conta? ")

            if (confirma) {
                navigate('/signup')
            } else {
                navigate('/')
            }
        }

        dispatch(setUsuarioLogado({ name: userExist!.name, email: userExist!.email, password: userExist!.password }))
        alert('Redirecionando...')
        setTimeout(() => {
            navigate('/home')
        }, 1500)
    }

    const clearInputs = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRepassword('');
    }
    return (
        <Grid container>
                <ImagemBanner />
         <Grid item xs={12} sm={8} md={5}>
                <Stack sx={{ my: 26, mx: 4, display: 'flex', flexDirection: 'column', alingItems: 'center', }}>


                    <Typography component="h1" variant="h5" sx={{ fontSize: 30, fontWeight: 700, padding: 2, }}>
                        Sistema de Recados
                    </Typography>


                    {mode === 'signup' && (
                        <Box>

                            <Grid item xs={12} width='30vw' sx={{ textAlign: 'center', mt: 2, }} >
                                <InputDefault type='email' label='E-mail' name='email' value={email} handleChange={mudarInput} color={errorEmail ? 'error' : 'warning'} />
                            </Grid>

                            <Grid item xs={12} width='30vw' sx={{ textAlign: 'center', mt: 2, }}>
                                <InputDefault type='password' label='Senha' name='password' value={password} handleChange={mudarInput} color={errorPassword ? 'error' : 'warning'} />
                            </Grid>

                            <Grid item xs={12} width='30vw' sx={{ textAlign: 'center', mt: 2, }}>
                                <InputDefault type='password' label='Repita a Senha' name='repassword' value={repassword} handleChange={mudarInput} color={errorPassword ? 'error' : 'warning'} />
                            </Grid>

                            <Grid item xs={12} width='30vw' sx={{ textAlign: 'center', mt: 2, }}>
                                <Button disabled={errorName || errorEmail || errorPassword} variant='contained' color='warning' onClick={createAccount}>Criar Conta</Button>
                            </Grid>
                        </Box>
                    )}

                    {mode === 'login' && (
                        <Box>

                            <Grid item xs={12} width='30vw'>
                                <InputDefault type='email' label='E-mail' name='email' value={email} handleChange={mudarInput} color={errorEmail ? 'error' : 'warning'} />
                            </Grid>

                            <Grid item xs={12} width='30vw' sx={{ mt: 2 }}>
                                <InputDefault type='password' label='Senha' name='password' value={password} handleChange={mudarInput} color={errorPassword ? 'error' : 'warning'} />
                            </Grid>


                            <Grid item xs={12} width='30vw' sx={{ textAlign: 'center', mt: 2, }}>
                                <Button disabled={errorEmail || errorPassword} variant='contained' color='warning' onClick={login}>Acessar</Button>
                            </Grid>
                        </Box>
                    )}


                    <Grid container>
                        <Grid sx={{ textAlign: 'center', mt: 2, }}>
                            {mode === 'login' && (<Typography color='white' variant='subtitle2'>N??o tem conta? <Typography variant='button' color='warning' sx={{ cursor: 'pointer' }} onClick={handleNavigate}>Cadastre-se</Typography></Typography>)}
                            {mode === 'signup' && (<Typography color='white' variant='subtitle2'>J?? tem conta? <Typography variant='button' color='warning' sx={{ cursor: 'pointer' }} onClick={handleNavigate}>Fazer Login</Typography></Typography>)}
                        </Grid>
                    </Grid>
                </Stack>
            </Grid>
        </Grid>

    )
}

export { Form }