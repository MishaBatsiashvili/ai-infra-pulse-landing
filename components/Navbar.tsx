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
import { motion } from 'framer-motion'

const MotionBox = motion(Box)
const MotionButton = motion(Button)

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
    if (typeof window !== 'undefined') {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  if (!mounted) {
    return (
      <Box
        as="nav"
        position="sticky"
        top={0}
        zIndex={100}
        bg="rgba(10, 10, 15, 0.9)"
        backdropFilter="blur(12px)"
        borderBottom="1px"
        borderColor="gray.900"
        py={3}
      >
        <Container maxW="960px">
          <Flex justify="space-between" align="center">
            <HStack spacing={2}>
              <Box w={2} h={2} borderRadius="full" bg="cyan.400" />
              <Text fontWeight="600" fontSize="md" color="white">
                AI Infra Pulse
              </Text>
            </HStack>
            <Button 
              size="sm" 
              variant="outline"
              color="gray.300"
              borderColor="gray.700"
            >
              Join waitlist
            </Button>
          </Flex>
        </Container>
      </Box>
    )
  }

  return (
    <MotionBox
      as="nav"
      position="sticky"
      top={0}
      zIndex={100}
      bg="rgba(10, 10, 15, 0.85)"
      backdropFilter="blur(12px)"
      borderBottom="1px"
      borderColor="gray.900"
      py={3}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Container maxW="960px">
        <Flex justify="space-between" align="center">
          <HStack spacing={2}>
            <Box
              w={2}
              h={2}
              borderRadius="full"
              bg="cyan.400"
              animation={`${pulse} 2s ease-in-out infinite`}
              boxShadow="0 0 10px rgba(6, 182, 212, 0.8)"
            />
            <Text fontWeight="600" fontSize="md" color="white">
              AI Infra Pulse
            </Text>
          </HStack>
          <MotionButton
            size="sm"
            variant="outline"
            color="gray.300"
            borderColor="gray.700"
            _hover={{ 
              borderColor: 'cyan.700',
              bg: 'rgba(6, 182, 212, 0.05)'
            }}
            onClick={() => scrollToSection('pricing')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join waitlist
          </MotionButton>
        </Flex>
      </Container>
    </MotionBox>
  )
}
