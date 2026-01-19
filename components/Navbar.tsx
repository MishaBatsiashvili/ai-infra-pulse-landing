'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Flex,
  Button,
  Text,
  HStack,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
`

export default function Navbar() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={100}
      bg="rgba(10, 10, 15, 0.9)"
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor="gray.900"
      py={3}
      role="navigation"
      aria-label="Main navigation"
    >
      <Container maxW="960px">
        <Flex justify="space-between" align="center">
          <HStack spacing={2} as="a" href="/" aria-label="AI Infra Pulse home">
            <Box
              w={2}
              h={2}
              borderRadius="full"
              bg="cyan.400"
              animation={mounted ? `${pulse} 2s ease-in-out infinite` : undefined}
            />
            <Text fontWeight="600" fontSize="md" color="white">
              AI Infra Pulse
            </Text>
          </HStack>
          <Button
            size="sm"
            bg="white"
            color="gray.900"
            fontWeight="500"
            borderRadius="md"
            _hover={{ bg: 'gray.100' }}
            _focus={{ boxShadow: '0 0 0 2px white' }}
            onClick={() => scrollToSection('pricing')}
            aria-label="Start free trial"
          >
            Try free
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
