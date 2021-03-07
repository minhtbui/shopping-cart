import React from 'react';
import { NavLink } from 'react-router-dom';
import { Image, Link, MenuDivider } from '@chakra-ui/react';

// chakra UI
import {
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { GrCart } from 'react-icons/gr';
import { AiOutlineLogin } from 'react-icons/ai';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';

const Header = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userLogin);

    const logoutHandler = () => {
        dispatch(logout());
    };
    return (
        <header>
            <Flex
                alignItems='center'
                paddingX='5%'
                paddingY='5px'
                bgColor='transparent'
                borderBottom='1px solid gray'>
                <Link as={NavLink} to='/'>
                    <Image src='/logo.svg' w='160px' h='80px'></Image>
                </Link>
                <Spacer />

                <Link as={NavLink} to='/cart'>
                    <GrCart fontSize='30' color='black' />
                </Link>

                {!userInfo ? (
                    <Link as={NavLink} to='/login' ml={5}>
                        <AiOutlineLogin fontSize='30' color='black' />
                    </Link>
                ) : (
                    <Menu>
                        <MenuButton
                            fontSize='xl'
                            variant='outline'
                            color='black'
                            borderColor='gray.500'
                            ml='8'>
                            Welcome, {userInfo.name}! <ChevronDownIcon />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Order</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </Flex>
        </header>
    );
};

export default Header;
