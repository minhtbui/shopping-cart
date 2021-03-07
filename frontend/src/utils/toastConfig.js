const toastConfig = (title, message) => {
    return {
        title: title,
        description: message,
        status: 'success',
        duration: 7000,
        isClosable: true,
    };
};

export default toastConfig;
