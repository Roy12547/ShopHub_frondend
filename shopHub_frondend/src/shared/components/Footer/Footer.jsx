import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    Link,
    VisuallyHidden,
    chakra,
    useColorModeValue,
    Flex,
    Center,
  } from "@chakra-ui/react";
  import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
  
  const ListHeader = (prop) => {
    const { children } = prop;
    return (
      <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
        {children}
      </Text>
    );
  };
  
  const SocialButton = (prop) => {
    const { children, label, href } = prop;
    return (
      <chakra.button
        bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
        rounded={"full"}
        w={8}
        h={8}
        cursor={"pointer"}
        as={"a"}
        href={href}
        display={"inline-flex"}
        alignItems={"center"}
        justifyContent={"center"}
        transition={"background 0.3s ease"}
        _hover={{
          bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
        }}
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  };
  
  export const Footer = ()=> {
    return (
      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing={8}
            justifyItems="center"
          >
            <Stack align={"center"}>
              <ListHeader>了解我們</ListHeader>
              <Link href={"#"}>關於ShopHub</Link>
              <Link href={"#"}>ShopHub商城</Link>
              <Link href={"#"}>賣家中心</Link>
              <Link href={"#"}>限時特賣</Link>
              <Link href={"#"}>隱私權政策</Link>
            </Stack>
  
            <Stack align={"center"}>
              <ListHeader>客服中心</ListHeader>
              <Link href={"#"}>幫助中心</Link>
              <Link href={"#"}>付款方式</Link>
              <Link href={"#"}>您的訂單</Link>
              <Link href={"#"}>退款退貨</Link>
              <Link href={"#"}>聯絡客服</Link>
              <Link href={"#"}>防詐騙宣導</Link>
            </Stack>
  
            <Stack align={"center"}>
              <ListHeader>付款</ListHeader>
              <Flex align="center">
                <img src="http://54.199.192.205/shopHub/assets/payment.png" alt="付款方式" />
              </Flex>
              <ListHeader>運送</ListHeader>
              <Flex align="center">
                <img src="http://54.199.192.205/shopHub/assets/shipping.png" alt="運送方式" />
              </Flex>
            </Stack>
          </SimpleGrid>
        </Container>
  
        <Box
          borderTopWidth={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Container
            as={Stack}
            maxW={"6xl"}
            py={4}
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify={{ md: "space-between" }}
            align={{ md: "center" }}
          >
            <Text>© 2024 ShopHub. All rights reserved</Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton label={"FaFacebook"} href={"#"}>
                <FaFacebook />
              </SocialButton>
              <SocialButton label={"YouTube"} href={"#"}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={"Instagram"} href={"#"}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Container>
        </Box>
      </Box>
    );
  }
  