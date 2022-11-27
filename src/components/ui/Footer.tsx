import { Box, BoxProps, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { GithubSvg } from "./GithubSvg";

export const Footer: React.FC<BoxProps> = (props) => {
  return (
    <Box
      background="white"
      height="150px"
      display="fixed"
      color="gray.900"
      {...props}
    >
      <Flex
        height="100%"
        width="100%"
        marginX="auto"
        px="2"
        pb="4"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <hr
          style={{ width: "100%", marginTop: "18px", background: "#e2e8f0" }}
        />
        <Box>
          <Heading fontSize={["lg", "lg", "2xl"]} as="h3">
            Starter Tab
          </Heading>
          <Heading
            fontSize={["md", "md", "md"]}
            mt="2"
            as="h3"
            color="gray.600"
          >
            ©2022; all rights reserved
          </Heading>
          <Text fontSize="sm" width="70%" mt="2">
            <Link href="mailto:allistergrange@gmail.com">
              feedback is invaluable
            </Link>
          </Text>
        </Box>
        <Box>
          <Flex alignItems="center">
            <Box w="2" h="2" bg="lightgreen" borderRadius="100%" />
            <Box ml="2" />
            <Link
              href="mailto:allistergrange@gmail.com"
              style={{ marginLeft: "2" }}
            >
              allig256
            </Link>
          </Flex>
          <Text mt="1">🥝 made in nz</Text>
          <Flex alignItems="center" mt="1">
            <GithubSvg height={16} width={16} fill={"black"} />
            <Box ml="2" />
            <Link href={"https://github.com/allister-grange/startertab"}>
              code
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
