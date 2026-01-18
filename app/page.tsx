'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Divider,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'
import {
  FiActivity,
  FiServer,
  FiAlertCircle,
  FiTrendingDown,
  FiCheck,
  FiEye,
  FiClock,
  FiZap,
  FiShield,
  FiTarget,
} from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import WaitlistForm from '@/components/WaitlistForm'
import ExampleDigest from '@/components/ExampleDigest'
import PulseAnimation from '@/components/PulseAnimation'

const MotionBox = motion(Box)
const MotionHeading = motion(Heading)
const MotionText = motion(Text)
const MotionBadge = motion(Badge)

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
`

const glow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2);
  }
  50% { 
    box-shadow: 0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.3);
  }
`

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = useCallback((id: string) => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  return (
    <Box minH="100vh" overflow="hidden" bg="#0a0a0f">
      <Navbar />
      
      {/* Hero Section */}
      <Box as="section" py={{ base: 16, md: 24 }} position="relative" overflow="hidden">
        {/* Animated gradient background */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="linear-gradient(135deg, #0a0a0f 0%, #0f172a 50%, #0a0a0f 100%)"
        />
        
        {/* Animated mesh gradient overlay */}
        <Box
          position="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          width="150%"
          height="100%"
          bg="radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)"
          pointerEvents="none"
        />
        
        {/* Grid pattern overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.03}
          backgroundImage="linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)"
          backgroundSize="50px 50px"
          pointerEvents="none"
        />

        <Container maxW="960px" position="relative">
          <VStack spacing={6} textAlign="center" maxW="720px" mx="auto">
            {mounted ? (
              <MotionBadge
                bg="rgba(6, 182, 212, 0.1)"
                color="cyan.400"
                fontSize="xs"
                px={4}
                py={2}
                borderRadius="full"
                border="1px solid"
                borderColor="cyan.900"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <HStack spacing={2}>
                  <Box
                    w={2}
                    h={2}
                    borderRadius="full"
                    bg="cyan.400"
                    animation={`${pulse} 2s ease-in-out infinite`}
                    boxShadow="0 0 10px rgba(6, 182, 212, 0.8)"
                  />
                  <Text>Coming soon</Text>
                </HStack>
              </MotionBadge>
            ) : (
              <Badge
                bg="rgba(6, 182, 212, 0.1)"
                color="cyan.400"
                fontSize="xs"
                px={4}
                py={2}
                borderRadius="full"
                border="1px solid"
                borderColor="cyan.900"
              >
                <HStack spacing={2}>
                  <Box w={2} h={2} borderRadius="full" bg="cyan.400" />
                  <Text>Coming soon</Text>
                </HStack>
              </Badge>
            )}

            {/* Pulse Animation */}
            <Box mt={4} mb={2}>
              <PulseAnimation />
            </Box>

            {mounted ? (
              <MotionHeading
                as="h1"
                fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
                fontWeight="700"
                lineHeight="1.1"
                color="white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                bgGradient="linear(to-r, white 0%, cyan.200 50%, white 100%)"
                bgClip="text"
                backgroundSize="200% auto"
                animation={`${shimmer} 8s linear infinite`}
              >
                A calm, daily signal on whether the AI infrastructure story is still holding together.
              </MotionHeading>
            ) : (
              <Heading
                as="h1"
                fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
                fontWeight="700"
                lineHeight="1.1"
                color="white"
              >
                A calm, daily signal on whether the AI infrastructure story is still holding together.
              </Heading>
            )}
            {mounted ? (
              <MotionText
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.400"
                lineHeight="1.8"
                maxW="640px"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Cuts through AI hype and shows what's actually changing upstream — memory, compute, data centers, and regulation. No predictions. No trading advice. Just a clear signal, once a day.
              </MotionText>
            ) : (
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.400"
                lineHeight="1.8"
                maxW="640px"
              >
                Cuts through AI hype and shows what's actually changing upstream — memory, compute, data centers, and regulation. No predictions. No trading advice. Just a clear signal, once a day.
              </Text>
            )}
            <Box>
              <HStack spacing={4} pt={6} flexWrap="wrap" justify="center">
                <Button
                  size="lg"
                  bg="cyan.500"
                  color="white"
                  _hover={{ 
                    bg: 'cyan.400', 
                    transform: 'translateY(-2px)',
                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)'
                  }}
                  onClick={() => scrollToSection('pricing')}
                  transition="all 0.3s"
                  animation={mounted ? `${glow} 3s ease-in-out infinite` : undefined}
                  fontWeight="600"
                >
                  Get the daily pulse
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  color="gray.300"
                  borderColor="gray.700"
                  _hover={{ 
                    bg: 'rgba(255,255,255,0.05)', 
                    transform: 'translateY(-2px)',
                    borderColor: 'cyan.700'
                  }}
                  onClick={() => scrollToSection('example')}
                  transition="all 0.3s"
                >
                  See an example digest
                </Button>
              </HStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* What it is */}
      <Box as="section" py={{ base: 12, md: 16 }} bg="#0f0f14" position="relative">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="1px"
          bgGradient="linear(to-r, transparent 0%, cyan.900 50%, transparent 100%)"
        />
        <Container maxW="960px">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
            <Box>
              <Text
                fontSize="xs"
                fontWeight="600"
                color="cyan.500"
                textTransform="uppercase"
                letterSpacing="widest"
                mb={3}
              >
                What it is
              </Text>
              <Heading as="h2" fontSize="xl" fontWeight="600" mb={4} color="white">
                AI Infra Pulse is a small, opinionated digest that monitors AI-related news and infrastructure signals, then summarizes what matters — and what doesn't.
              </Heading>
              <List spacing={4} mt={6}>
                {[
                  { icon: FiServer, text: 'Memory & compute supply signals' },
                  { icon: FiActivity, text: 'Data center expansion and capex language' },
                  { icon: FiShield, text: 'Regulatory friction that impacts deployment' },
                  { icon: FiAlertCircle, text: 'Early signs of stress or slowdown' },
                  { icon: FiTarget, text: 'Confidence level + time horizon' },
                ].map((item, i) => (
                  <ListItem key={i} display="flex" alignItems="flex-start">
                    <ListIcon 
                      as={item.icon} 
                      color="cyan.500" 
                      mt={1}
                      filter="drop-shadow(0 0 4px rgba(6, 182, 212, 0.5))"
                    />
                    <Text color="gray.300">{item.text}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box>
              <Text
                fontSize="xs"
                fontWeight="600"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="widest"
                mb={3}
              >
                What it is NOT
              </Text>
              <MotionBox
                bg="rgba(255,255,255,0.02)"
                border="1px"
                borderColor="gray.800"
                borderRadius="lg"
                p={6}
                _hover={{ 
                  borderColor: 'cyan.900',
                  bg: 'rgba(6, 182, 212, 0.02)'
                }}
                transition="all 0.3s"
                whileHover={{ y: -4 }}
              >
                <Text color="gray.300" fontSize="md" lineHeight="1.8">
                  This is not stock picks, buy/sell advice, or price predictions. It's situational awareness.
                </Text>
              </MotionBox>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* What you get each day */}
      <Box as="section" py={{ base: 12, md: 16 }} bg="#0a0a0f" position="relative">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="1px"
          bgGradient="linear(to-r, transparent 0%, gray.800 50%, transparent 100%)"
        />
        <Container maxW="960px">
          <VStack spacing={8} textAlign="center" mb={10}>
            <Box>
              <Text
                fontSize="xs"
                fontWeight="600"
                color="cyan.500"
                textTransform="uppercase"
                letterSpacing="widest"
                mb={3}
              >
                What you get each day
              </Text>
              <Heading as="h2" fontSize="xl" fontWeight="600" color="white">
                A short digest you can read in under 2 minutes.
              </Heading>
            </Box>
          </VStack>
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={5}>
            {[
              { icon: FiZap, label: 'What changed', color: 'cyan.400' },
              { icon: FiCheck, label: 'Positive signals', color: 'green.400' },
              { icon: FiTrendingDown, label: 'Negative signals', color: 'red.400' },
              { icon: FiEye, label: 'What is NOT happening yet', color: 'gray.400' },
              { icon: FiActivity, label: 'What to watch next', color: 'purple.400' },
              { icon: FiClock, label: 'Confidence + time horizon', color: 'orange.400' },
            ].map((item, i) => (
              <MotionBox
                key={i}
                bg="rgba(255,255,255,0.02)"
                border="1px"
                borderColor="gray.800"
                borderRadius="lg"
                p={5}
                textAlign="center"
                _hover={{ 
                  borderColor: 'cyan.800',
                  bg: 'rgba(6, 182, 212, 0.03)'
                }}
                transition="all 0.3s"
                cursor="default"
                whileHover={{ y: -6, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                // @ts-ignore
                transition={{ delay: i * 0.1 }}
              >
                <Box
                  as={item.icon}
                  size="24px"
                  color={item.color}
                  mx="auto"
                  mb={3}
                  filter={`drop-shadow(0 0 8px ${item.color === 'cyan.400' ? 'rgba(6, 182, 212, 0.5)' : 'transparent'})`}
                />
                <Text fontSize="sm" color="gray.300" fontWeight="500">
                  {item.label}
                </Text>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Example Digest */}
      <Box as="section" id="example" py={{ base: 12, md: 16 }} bg="#0f0f14" position="relative">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="1px"
          bgGradient="linear(to-r, transparent 0%, cyan.900 50%, transparent 100%)"
        />
        <Container maxW="960px">
          <VStack spacing={8}>
            <Box textAlign="center">
              <Text
                fontSize="xs"
                fontWeight="600"
                color="cyan.500"
                textTransform="uppercase"
                letterSpacing="widest"
                mb={3}
              >
                Example digest
              </Text>
              <Heading as="h2" fontSize="xl" fontWeight="600" color="white">
                Here's what a typical pulse looks like.
              </Heading>
            </Box>
            <Box w="100%">
              <ExampleDigest />
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Pricing */}
      <Box as="section" id="pricing" py={{ base: 12, md: 16 }} bg="#0a0a0f" position="relative">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="1px"
          bgGradient="linear(to-r, transparent 0%, gray.800 50%, transparent 100%)"
        />
        {/* Glow effect behind pricing card */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="400px"
          height="400px"
          bg="radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)"
          pointerEvents="none"
        />
        <Container maxW="960px" position="relative">
          <VStack spacing={8}>
            <Box textAlign="center">
              <Text
                fontSize="xs"
                fontWeight="600"
                color="cyan.500"
                textTransform="uppercase"
                letterSpacing="widest"
                mb={3}
              >
                Pricing
              </Text>
            </Box>
            <MotionBox
              bg="rgba(255,255,255,0.02)"
              border="1px"
              borderColor="gray.800"
              borderRadius="xl"
              p={8}
              maxW="400px"
              w="100%"
              _hover={{ 
                borderColor: 'cyan.800',
              }}
              transition="all 0.3s"
              whileHover={{ y: -4 }}
              animation={mounted ? `${float} 6s ease-in-out infinite` : undefined}
            >
              <VStack spacing={5} align="stretch">
                <Box textAlign="center">
                  <Text fontWeight="600" fontSize="lg" color="white">
                    AI Infra Pulse
                  </Text>
                  <HStack justify="center" mt={2} spacing={1}>
                    <Text 
                      fontSize="4xl" 
                      fontWeight="700" 
                      bgGradient="linear(to-r, cyan.400, cyan.200)"
                      bgClip="text"
                    >
                      $5
                    </Text>
                    <Text color="gray.500" fontSize="md">
                      / month
                    </Text>
                  </HStack>
                </Box>
                <Divider borderColor="gray.800" />
                <Text fontSize="sm" color="gray.400" textAlign="center">
                  Daily digest. Cancel anytime. No ads. No upsells.
                </Text>
                <WaitlistForm />
              </VStack>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      {/* FAQ */}
      <Box as="section" py={{ base: 12, md: 16 }} bg="#0f0f14" position="relative">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="1px"
          bgGradient="linear(to-r, transparent 0%, cyan.900 50%, transparent 100%)"
        />
        <Container maxW="960px">
          <VStack spacing={8}>
            <Box textAlign="center">
              <Text
                fontSize="xs"
                fontWeight="600"
                color="cyan.500"
                textTransform="uppercase"
                letterSpacing="widest"
                mb={3}
              >
                FAQ
              </Text>
              <Heading as="h2" fontSize="xl" fontWeight="600" color="white">
                Common questions
              </Heading>
            </Box>
            <Box maxW="600px" w="100%">
              <Accordion allowMultiple>
                {[
                  {
                    q: 'Is this financial advice?',
                    a: "No. It's a lens, not a crystal ball.",
                  },
                  {
                    q: 'Does it predict prices?',
                    a: 'No. It summarizes signals and uncertainty.',
                  },
                  {
                    q: 'How do I receive it?',
                    a: 'Email (daily).',
                  },
                  {
                    q: 'What sources do you use?',
                    a: 'Public news + structured signal extraction (no paywalled scraping).',
                  },
                  {
                    q: 'Can I cancel anytime?',
                    a: 'Yes.',
                  },
                ].map((item, i) => (
                  <AccordionItem
                    key={i}
                    border="1px"
                    borderColor="gray.800"
                    borderRadius="lg"
                    mb={3}
                    bg="rgba(255,255,255,0.02)"
                    _hover={{ borderColor: 'cyan.900' }}
                    transition="all 0.2s"
                  >
                    <AccordionButton 
                      py={4} 
                      px={5} 
                      _hover={{ bg: 'rgba(6, 182, 212, 0.03)' }}
                      borderRadius="lg"
                    >
                      <Box flex="1" textAlign="left" fontWeight="500" color="gray.200">
                        {item.q}
                      </Box>
                      <AccordionIcon color="cyan.500" />
                    </AccordionButton>
                    <AccordionPanel pb={4} px={5} color="gray.400">
                      {item.a}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        py={8}
        bg="#0a0a0f"
        borderTop="1px"
        borderColor="gray.900"
      >
        <Container maxW="960px">
          <VStack spacing={4}>
            <HStack spacing={2}>
              <Box
                w={3}
                h={3}
                borderRadius="full"
                bg="cyan.400"
                animation={mounted ? `${pulse} 2s ease-in-out infinite` : undefined}
                boxShadow="0 0 15px rgba(6, 182, 212, 0.8)"
              />
              <Text fontWeight="600" fontSize="sm" color="white">
                AI Infra Pulse
              </Text>
            </HStack>
            <Text fontSize="xs" color="gray.600">
              © {new Date().getFullYear()} AI Infra Pulse. All rights reserved.
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
