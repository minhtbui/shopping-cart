import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import {
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Modal,
} from '@chakra-ui/modal';
import React from 'react';
import { useForm } from 'react-hook-form';
// redux
import { useDispatch } from 'react-redux';
import { savePaymentAddress } from '../actions/paymentAction';

const AddressForm = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const saveAddressHandler = (data) => {
        dispatch(savePaymentAddress(data));
        onClose();
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as='form' onSubmit={handleSubmit(saveAddressHandler)}>
                <ModalHeader>Add Address</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Street</FormLabel>
                        <Input
                            placeholder='Street'
                            name='street'
                            ref={register}
                            required
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>District</FormLabel>
                        <Input
                            placeholder='District'
                            name='district'
                            ref={register}
                            required
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>City</FormLabel>
                        <Input
                            placeholder='City'
                            name='city'
                            ref={register}
                            required
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Country</FormLabel>
                        <Input
                            placeholder='Country'
                            name='country'
                            ref={register}
                            required
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button type='submit' colorScheme='blue' mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddressForm;
