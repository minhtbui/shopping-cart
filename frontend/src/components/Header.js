import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, IconButton, Image, Link, MenuDivider } from '@chakra-ui/react';

// chakra UI
import {
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
} from '@chakra-ui/react';
import { GrCart } from 'react-icons/gr';

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
                        <Avatar
                            size='sm'
                            bg='black'
                            src='https://bit.ly/broken-link'
                        />{' '}
                    </Link>
                ) : (
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            fontSize='xl'
                            variant='none'
                            ml='4'
                            icon={
                                <Avatar
                                    size='sm'
                                    bg='teal.500'
                                    name={userInfo.name}
                                    src={userInfo?.avartar}
                                />
                            }
                        />

                        <MenuList>
                            <Link
                                as={NavLink}
                                to={`${userInfo.name.toLowerCase()}/profile`}>
                                <MenuItem>Profile</MenuItem>
                            </Link>

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
