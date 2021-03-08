const toastConfig = (title, message) => {
    return {
        title: title,
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true,
    };
};

export default toastConfig;
