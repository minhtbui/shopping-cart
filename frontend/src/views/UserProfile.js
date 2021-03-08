import React, { useEffect, useState } from 'react';
import {
    Alert,
    AlertIcon,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    Input,
    InputRightElement,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const UserProfile = ({ location, history }) => {
    const toast = useToast();
    const { register, handleSubmit } = useForm();
    const [show, setShow] = useState(false);
    const [validate, setValidate] = useState({
        error: false,
        message: '',
    });

    const { loading, error, userInfo } = useSelector(
        (state) => state.userLogin,
    );

    useEffect(() => {
        if (!userInfo) {
            history.push('/');
        }
    }, [history, userInfo]);

    const formOnSubmitHandler = ({ name, email, password, cfPassword }) => {
        if (password !== cfPassword) {
            setValidate({ error: true, message: 'Passwords do not match' });
        }
    };
    return (
        userInfo && (
            <Grid templateColumns='30% 70%'>
                <VStack
                    as='form'
                    bg='gray.200'
                    boxShadow='2px 2px 10px #f3f3f3'
                    borderRadius='20px'
                    p='10px'
                    spacing={6}
                    onSubmit={handleSubmit(formOnSubmitHandler)}>
                    <Text as='h2' fontWeight='500' fontSize='5xl'>
                        Profile
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
                            defaultValue={userInfo.name}
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
                            defaultValue={userInfo.email}
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
                        borderColor='gray.500'
                        variant='outline'
                        isLoading={loading && 'true'}>
                        Update
                    </Button>
                </VStack>
            </Grid>
        )
    );
};

export default UserProfile;
