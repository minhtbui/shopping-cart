import { extendTheme } from '@chakra-ui/react';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    styles: {
        global: {
            body: {
                fontFamily: 'Roboto, sans-serif',
            },
            a: {
                _hover: {
                    textDecoration: 'none !important',
                },
            },
        },
    },
});

export default theme;
