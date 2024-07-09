import React, { useState } from 'react';
import {
  Flex, Text, Badge, Button, useDisclosure,
  AlertDialog, AlertDialogOverlay, AlertDialogContent,
  AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react';

const CardList = () => {
  const [deleteIndex, setDeleteIndex] = useState(null);

  const setDefaultCard = (index) => {
    setCards((prevCards) => {
      const newCards = prevCards.map((card, idx) => ({
        ...card,
        isDefault: idx === index,
      }));
      const defaultCard = newCards.splice(index, 1)[0];
      newCards.unshift(defaultCard);
      return newCards;
    });
  };

  const deleteCard = () => {
    if (deleteIndex !== null) {
      setCards((prevCards) => {
        const newCards = prevCards.filter((_, idx) => idx !== deleteIndex);
        if (newCards.length > 0 && prevCards[deleteIndex].isDefault) {
          newCards[0].isDefault = true;
        }
        return newCards;
      });
      onClose();
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <>
      {cards.map((card, index) => (
        <Flex
          key={card.number}
          h={'80px'}
          alignItems="center"
          p={'6px'}
          borderTop={index !== 0 ? '1px' : 'none'}
        >
          <Flex flex="1" alignItems="center">
            <Text fontSize={'25px'}>{card.type}</Text>
            {card.isDefault && (
              <Badge colorScheme="purple" ml={2} display="inline-flex" alignItems="center">
                預設
              </Badge>
            )}
          </Flex>
          <Flex flex="1" justifyContent="center">
            <Text>{card.number}</Text>
          </Flex>
          <Flex flex="1" justifyContent="flex-end">
            <Button
              colorScheme="teal"
              size="sm"
              variant="outline"
              mr={2}
              onClick={() => {
                setDeleteIndex(index);
                onOpen();
              }}
            >
              刪除
            </Button>
            <AlertDialog
              motionPreset='slideInBottom'
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogHeader>刪除信用卡/金融卡</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  您確定要刪除此信用卡/金融卡嗎？
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    取消
                  </Button>
                  <Button colorScheme='red' ml={3} onClick={deleteCard}>
                    確定
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => setDefaultCard(index)}
              isDisabled={card.isDefault}
            >
              設為預設
            </Button>
          </Flex>
        </Flex>
      ))}
    </>
  );
};

export default CardList;
