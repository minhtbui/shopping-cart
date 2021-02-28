import React from 'react';

// chakra UI
import { AiOutlineCopyrightCircle } from 'react-icons/ai';
import { Flex, Text } from '@chakra-ui/react';

const Footer = () => {
    return (
        <footer>
            <Flex
                px='20'
                bgColor='transparent'
                justifyContent='center'
                alignItems='center'
                borderTop='1px solid gray'
                py='5'>
                <AiOutlineCopyrightCircle color='black' />
                <Text size='sm' color='black' ml='2'>
                    Copyright 2021
                </Text>
            </Flex>
        </footer>
    );
};

export default Footer;
