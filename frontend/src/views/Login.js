import React, { useEffect } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useForm } from 'react-hook-form';
import toastConfig from '../utils/toastConfig';

import {
    FormControl,
    FormLabel,
    Input,
    Text,
    InputRightElement,
    Button,
    Link,
    VStack,
    Alert,
    AlertIcon,
    useToast,
} from '@chakra-ui/react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userAction';

const Login = ({ location, history }) => {
    const dispatch = useDispatch();
    const toast = useToast();
    const { register, handleSubmit } = useForm();
    const [show, setShow] = React.useState(false);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const { loading, error, userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const formOnSubmitHandler = ({ email, password }) => {
        dispatch(login(email, password));
        if (userInfo) {
            toast(
                toastConfig(
                    'Login Success.',
                    'Welcome to the Wisdom World ! Have a nice day.',
                ),
            );
        }
    };
    return (
        <>
            <FormContainer>
                <VStack
                    as='form'
                    spacing={6}
                    onSubmit={handleSubmit(formOnSubmitHandler)}>
                    <Text as='h2' fontWeight='500' fontSize='5xl'>
                        Sign In
                    </Text>
                    {error && (
                        <Alert status='error'>
                            <AlertIcon />
                            {error}{' '}
                        </Alert>
                    )}
                    <FormControl id='email' isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            name='email'
                            variant='flushed'
                            pr={2}
                            pl={2}
                            ref={register}
                        />
                    </FormControl>
                    <FormControl id='password' isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            name='password'
                            variant='flushed'
                            type={show ? 'text' : 'password'}
                            pr='4.5rem'
                            pl={2}
                            ref={register}
                        />
                        <InputRightElement
                            width='4.5rem'
                            bottom={2}
                            top='unset'>
                            <Button
                                h='1.75rem'
                                variant='none'
                                size='sm'
                                onClick={() => setShow(!show)}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </FormControl>
                    <Button
                        type='submit'
                        w='50%'
                        borderColor='gray.200'
                        variant='outline'
                        isLoading={loading && 'true'}>
                        Log In
                    </Button>
                    <Text as='h6'>
                        Need an Account?{' '}
                        <Link
                            as={ReactLink}
                            to={
                                redirect
                                    ? `/register?redirect=${redirect}`
                                    : '/register'
                            }
                            fontWeight='500'>
                            Register!
                        </Link>
                    </Text>
                </VStack>
            </FormContainer>
        </>
    );
};

export default Login;
