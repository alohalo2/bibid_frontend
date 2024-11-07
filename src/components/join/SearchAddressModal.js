import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import DaumPostcode from "react-daum-postcode";

export default function SearchAddressModal({ isOpen, onClose, onCompletePost }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>주소검색</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <DaumPostcode onComplete={onCompletePost} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
