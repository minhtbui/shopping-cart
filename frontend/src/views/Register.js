import React, { useEffect, useState } from 'react';
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
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { register as registerAction } from '../actions/userAction';

const Register = ({ location, history }) => {
    const dispatch = useDispatch();
    const toast = useToast();
    const { register, handleSubmit } = useForm();
    const [show, setShow] = useState(false);
    const [validate, setValidate] = useState({
        error: false,
        message: '',
    });

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const { loading, error, userInfo } = useSelector(
        (state) => state.userLogin,
    );

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const formOnSubmitHandler = ({ name, email, password, cfPassword }) => {
        if (password !== cfPassword) {
            setValidate({ error: true, message: 'Passwords do not match' });
        } else {
            dispatch(registerAction(name, email, password));
            setValidate({
                error: false,
                message: '',
            });
            toast(toastConfig('Account Created.', 'Thank you for joining us!'));
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
                        Sign Up
                    </Text>
                    {error && (
                        <Alert status='error'>
                            <AlertIcon />
                            {error}{' '}
                        </Alert>
                    )}
                    <FormControl id='Name' isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            name='name'
                            variant='flushed'
                            pr={2}
                            pl={2}
                            ref={register}
                        />
                    </FormControl>
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
                    <FormControl
                        id='password'
                        isInvalid={validate.error}
                        isRequired>
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
                    <FormControl
                        id='cfPassword'
                        isInvalid={validate.error}
                        isRequired>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            name='cfPassword'
                            variant='flushed'
                            type={show ? 'text' : 'password'}
                            pr='4.5rem'
                            pl={2}
                            ref={register}
                        />
                        <FormErrorMessage>{validate.message}</FormErrorMessage>
                    </FormControl>
                    <Button
                        type='submit'
                        w='50%'
                        borderColor='gray.200'
                        variant='outline'
                        isLoading={loading && 'true'}>
                        Register
                    </Button>
                    <Text as='h6'>
                        Have an Account?{' '}
                        <Link
                            as={ReactLink}
                            to={
                                redirect
                                    ? `/login?redirect=${redirect}`
                                    : '/login'
                            }
                            fontWeight='500'>
                            Login!
                        </Link>
                    </Text>
                </VStack>
            </FormContainer>
        </>
    );
};

export default Register;
