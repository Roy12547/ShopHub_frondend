import React, { useState } from 'react';
import {
  Flex, Text, Badge, Button, useDisclosure,
  AlertDialog, AlertDialogOverlay, AlertDialogContent,
  AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody,
  AlertDialogFooter, Box
} from '@chakra-ui/react';

const BankList = () => {
  const [deleteIndex, setDeleteIndex] = useState(null);

  const setDefaultCard = (index) => {
    const newCards = cards.map((card, idx) => ({
      ...card,
      isDefault: idx === index,
    }));
    const defaultCard = newCards.splice(index, 1)[0];
    newCards.unshift(defaultCard);
    setCards(newCards);
  };

  const deleteCard = () => {
    if (deleteIndex !== null) {
      let newCards = cards.filter((_, idx) => idx !== deleteIndex);
      if (newCards.length > 0 && cards[deleteIndex].isDefault) {
        newCards[0].isDefault = true;
      }
      setCards(newCards);
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
            <Box>
              <Text fontSize={'15px'}>{card.bank}</Text>
              <Text fontSize={'13px'}>姓名: {card.name}</Text>
              <Text fontSize={'13px'}>地區: {card.region} 分行: {card.branch}</Text>
            </Box>
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
                <AlertDialogHeader>刪除銀行帳戶資料</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  您確定要刪除此銀行帳戶資料嗎？
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

export default BankList;
