import React from 'react';
import { NavLink } from 'react-router-dom';

// chakra UI
import {
    Flex,
    Heading,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { GrCart } from 'react-icons/gr';

const Header = () => {
    return (
        <header>
            <Flex
                alignItems='center'
                paddingX='20'
                paddingY='5'
                bgColor='transparent'
                borderBottom='1px solid gray'>
                <NavLink to='/'>
                    <Heading color='black'>Logo</Heading>
                </NavLink>
                <Spacer />

                <NavLink to='/cart'>
                    <GrCart fontSize='35' color='black' />
                </NavLink>

                <Menu>
                    <MenuButton
                        as={IconButton}
                        icon={<HamburgerIcon />}
                        size='md'
                        variant='outline'
                        color='black'
                        borderColor='gray.500'
                        ml='8'
                    />
                    <MenuList>
                        <MenuItem>Welcome!</MenuItem>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Shipping</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </header>
    );
};

export default Header;
