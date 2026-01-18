'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  FormControl,
  Input,
  HStack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion, AnimatePresence } from 'framer-motion'

const MotionBox = motion(Box)
const MotionButton = motion(Button)
const MotionText = motion(Text)

const checkmark = keyframes`
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`

const glow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.3), 0 0 30px rgba(6, 182, 212, 0.1);
  }
  50% { 
    box-shadow: 0 0 25px rgba(6, 182, 212, 0.4), 0 0 50px rgba(6, 182, 212, 0.2);
  }
`

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [savedEmail, setSavedEmail] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const toast = useToast()

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('waitlistEmail')
      if (stored) {
        setSavedEmail(stored)
        setEmail(stored)
      }
    }
  }, [])

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isValidEmail(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsSubmitting(true)
    
    // Simulate a brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 400))

    if (typeof window !== 'undefined') {
      localStorage.setItem('waitlistEmail', email)
    }
    setSavedEmail(email)
    setIsSubmitting(false)
    
    toast({
      title: "You're on the list!",
      description: "We'll notify you when AI Infra Pulse launches.",
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
  }

  if (!mounted) {
    return (
      <Box as="form" w="100%">
        <FormControl>
          <HStack spacing={2}>
            <Input
              type="email"
              placeholder="your@email.com"
              bg="rgba(255,255,255,0.05)"
              borderColor="gray.700"
              color="white"
              size="md"
            />
            <Button
              type="submit"
              bg="cyan.500"
              color="white"
              size="md"
              px={6}
              flexShrink={0}
            >
              Join waitlist
            </Button>
          </HStack>
        </FormControl>
      </Box>
    )
  }

  return (
    <MotionBox
      as="form"
      onSubmit={handleSubmit}
      w="100%"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <FormControl>
        <HStack spacing={2}>
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg="rgba(255,255,255,0.05)"
            borderColor="gray.700"
            color="white"
            _placeholder={{ color: 'gray.500' }}
            _focus={{ 
              borderColor: 'cyan.500', 
              boxShadow: '0 0 0 1px var(--chakra-colors-cyan-500), 0 0 20px rgba(6, 182, 212, 0.2)' 
            }}
            _hover={{ borderColor: 'gray.600' }}
            size="md"
            transition="all 0.2s"
          />
          <MotionButton
            type="submit"
            bg="cyan.500"
            color="white"
            _hover={{ 
              bg: 'cyan.400',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)'
            }}
            size="md"
            px={6}
            flexShrink={0}
            isLoading={isSubmitting}
            loadingText="Joining"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animation={`${glow} 3s ease-in-out infinite`}
            fontWeight="600"
          >
            Join waitlist
          </MotionButton>
        </HStack>
        <AnimatePresence>
          {savedEmail && (
            <MotionText
              fontSize="xs"
              color="cyan.400"
              mt={2}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                as="span"
                display="inline-block"
                animation={`${checkmark} 0.3s ease-out`}
              >
                ✓
              </Box>
              {' '}Saved: {savedEmail}
            </MotionText>
          )}
        </AnimatePresence>
      </FormControl>
    </MotionBox>
  )
}
