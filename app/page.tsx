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
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  FormControl,
  useToast,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
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
  FiInfo,
} from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import ExampleDigest from '@/components/ExampleDigest'

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
`

// Sleek email capture component
function EmailCapture({ variant = 'default' }: { variant?: 'default' | 'minimal' }) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: 'Please enter a valid email', status: 'error', duration: 3000 })
      return
    }
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 500))
    // TODO: Replace with actual API call
    localStorage.setItem('ai-infra-pulse-email', email)
    setIsSubmitted(true)
    setIsSubmitting(false)
    toast({ title: "You're in!", description: 'Check your inbox for the first digest.', status: 'success', duration: 4000 })
  }

  if (isSubmitted) {
    return (
      <HStack spacing={2} justify="center" py={2}>
        <Box as={FiCheck} color="cyan.400" />
        <Text fontSize="sm" color="cyan.400">Check your inbox</Text>
      </HStack>
    )
  }

  return (
    <Box as="form" onSubmit={handleSubmit} w="100%">
      <FormControl>
        {/* Elegant pill-shaped container */}
        <Box
          position="relative"
          borderRadius="full"
          bg="rgba(255,255,255,0.03)"
          border="1px solid"
          borderColor={isFocused ? 'gray.600' : 'gray.800'}
          p="4px"
          transition="all 0.2s"
          _hover={{ borderColor: 'gray.700' }}
          boxShadow={isFocused ? '0 0 0 1px rgba(255,255,255,0.05)' : 'none'}
        >
          <HStack spacing={0}>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              bg="transparent"
              border="none"
              color="white"
              fontSize="sm"
              _placeholder={{ color: 'gray.500' }}
              _focus={{ boxShadow: 'none' }}
              px={4}
              h={variant === 'minimal' ? '36px' : '42px'}
              borderRadius="full"
              aria-label="Email address"
            />
            <Button
              type="submit"
              bg="white"
              color="gray.900"
              fontSize="sm"
              fontWeight="500"
              h={variant === 'minimal' ? '36px' : '42px'}
              px={variant === 'minimal' ? 4 : 5}
              borderRadius="full"
              isLoading={isSubmitting}
              loadingText=""
              _hover={{ bg: 'gray.100' }}
              _active={{ bg: 'gray.200' }}
              flexShrink={0}
              transition="all 0.15s"
            >
              {variant === 'minimal' ? 'Subscribe' : 'Start free'}
            </Button>
          </HStack>
        </Box>
        <Text fontSize="xs" color="gray.600" mt={3} textAlign="center" letterSpacing="wide">
          Free for 14 days · No card required
        </Text>
      </FormControl>
    </Box>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <Box minH="100vh" bg="#0a0a0f">
      {/* Skip to main content - accessibility */}
      <Box
        as="a"
        href="#main-content"
        position="absolute"
        left="-9999px"
        _focus={{ left: '50%', transform: 'translateX(-50%)', top: 4, zIndex: 9999, bg: 'white', color: 'black', p: 2, borderRadius: 'md' }}
      >
        Skip to main content
      </Box>

      <Navbar />
      
      {/* Hero Section - Tightened */}
      <Box as="section" id="main-content" py={{ base: 12, md: 20 }} position="relative">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="linear-gradient(180deg, #0a0a0f 0%, #0f1419 100%)"
        />
        <Box
          position="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          width="100%"
          height="100%"
          bg="radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.08) 0%, transparent 60%)"
          pointerEvents="none"
        />

        <Container maxW="700px" position="relative">
          <VStack spacing={6} textAlign="center">
            {/* Compact pulse indicator */}
            <HStack spacing={2} color="gray.500" fontSize="sm">
              <Box
                w={2}
                h={2}
                borderRadius="full"
                bg="cyan.400"
                animation={mounted ? `${pulse} 2s ease-in-out infinite` : undefined}
              />
              <Text>Daily AI infrastructure signal</Text>
            </HStack>

            <Heading
              as="h1"
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight="600"
              lineHeight="1.2"
              color="white"
            >
              Too much AI{' '}
              <Text as="span" color="gray.500">noise.</Text>
              <br />
              Not enough{' '}
              <Text as="span" color="cyan.400">signal.</Text>
            </Heading>

            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.400"
              lineHeight="1.7"
              maxW="560px"
            >
              A 2-minute daily email on what's actually changing in AI infrastructure — compute, memory, data centers, regulation. No hype. No predictions.
            </Text>

            {/* Single Primary CTA */}
            <Box w="100%" maxW="400px" pt={4}>
              <EmailCapture />
            </Box>

            {/* Subtle secondary link */}
            <Button
              variant="link"
              color="gray.500"
              fontSize="sm"
              fontWeight="400"
              onClick={() => scrollToSection('example')}
              _hover={{ color: 'gray.300' }}
            >
              See a sample digest ↓
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Example Digest - Moved up to show value */}
      <Box as="section" id="example" py={{ base: 10, md: 14 }} bg="#0a0a0f">
        <Container maxW="960px">
          <VStack spacing={6}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={2}>
                Sample digest
              </Text>
              <Heading as="h2" fontSize="xl" fontWeight="600" color="white">
                Here's what you get each morning.
              </Heading>
            </Box>
            <ExampleDigest />
          </VStack>
        </Container>
      </Box>

      {/* How We Score - Method Transparency */}
      <Box as="section" py={{ base: 10, md: 14 }} bg="#0f1014">
        <Container maxW="800px">
          <VStack spacing={6}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={2}>
                Our method
              </Text>
              <Heading as="h2" fontSize="xl" fontWeight="600" color="white">
                How we score signals
              </Heading>
            </Box>

            <Box
              w="100%"
              bg="rgba(255,255,255,0.02)"
              border="1px solid"
              borderColor="gray.800"
              borderRadius="lg"
              p={6}
            >
              <VStack align="stretch" spacing={4}>
                <Text color="gray.300" fontSize="sm" lineHeight="1.8">
                  Each day, we analyze news from Reuters, Bloomberg, SEC filings, and earnings calls. We look for changes in six areas: memory supply, GPU availability, foundry capacity, data center expansion, regulatory shifts, and macro conditions.
                </Text>
                
                <Divider borderColor="gray.800" />

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box>
                    <Text fontWeight="500" color="white" fontSize="sm" mb={2}>Signal strength</Text>
                    <VStack align="stretch" spacing={1} fontSize="xs" color="gray.400">
                      <HStack><Box w={2} h={2} bg="green.400" borderRadius="full" /><Text>Strong — multiple confirming sources</Text></HStack>
                      <HStack><Box w={2} h={2} bg="yellow.400" borderRadius="full" /><Text>Mixed — conflicting signals</Text></HStack>
                      <HStack><Box w={2} h={2} bg="red.400" borderRadius="full" /><Text>Weak — concerning indicators</Text></HStack>
                    </VStack>
                  </Box>
                  <Box>
                    <Text fontWeight="500" color="white" fontSize="sm" mb={2}>Confidence levels</Text>
                    <VStack align="stretch" spacing={1} fontSize="xs" color="gray.400">
                      <Text>• <strong>High</strong> — Clear data, low noise</Text>
                      <Text>• <strong>Medium</strong> — Some uncertainty</Text>
                      <Text>• <strong>Low</strong> — Elevated noise, proceed with caution</Text>
                    </VStack>
                  </Box>
                </SimpleGrid>

                <Divider borderColor="gray.800" />

                {/* Intellectual honesty section */}
                <Box bg="rgba(234, 179, 8, 0.05)" p={4} borderRadius="md" borderLeft="2px solid" borderColor="yellow.600">
                  <HStack spacing={2} mb={2}>
                    <Box as={FiInfo} color="yellow.500" />
                    <Text fontWeight="500" color="yellow.500" fontSize="sm">We may be wrong</Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.400" lineHeight="1.7">
                    Our analysis is based on public information and our interpretation. Markets are complex. We include confidence levels and "what would change our mind" specifically because we know we can miss things. Use this as one input, not the only input.
                  </Text>
                </Box>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* What it is / isn't - Tightened */}
      <Box as="section" py={{ base: 10, md: 14 }} bg="#0a0a0f">
        <Container maxW="800px">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box>
              <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={3}>
                What it is
              </Text>
              <Text color="gray.300" fontSize="md" lineHeight="1.8" mb={4}>
                A short daily digest that tracks AI infrastructure signals — supply chains, capex, chips, and policy — then tells you what matters.
              </Text>
              <List spacing={2}>
                {[
                  { icon: FiServer, text: 'Memory & compute supply' },
                  { icon: FiActivity, text: 'Data center expansion' },
                  { icon: FiShield, text: 'Regulatory changes' },
                  { icon: FiAlertCircle, text: 'Early stress signals' },
                ].map((item, i) => (
                  <ListItem key={i} display="flex" alignItems="center" fontSize="sm">
                    <ListIcon as={item.icon} color="gray.500" />
                    <Text color="gray.400">{item.text}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={3}>
                What it is NOT
              </Text>
              <Box bg="rgba(255,255,255,0.02)" border="1px solid" borderColor="gray.800" borderRadius="lg" p={5}>
                <Text color="gray.400" fontSize="md" lineHeight="1.8">
                  Not stock picks. Not buy/sell signals. Not price predictions. This is <strong style={{ color: '#e5e5e5' }}>situational awareness</strong> — context to help you think, not instructions to follow.
                </Text>
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* What's Inside - Brief */}
      <Box as="section" py={{ base: 10, md: 14 }} bg="#0f1014">
        <Container maxW="700px">
          <VStack spacing={6}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={2}>
                Each digest includes
              </Text>
            </Box>
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3} w="100%">
              {[
                { icon: FiZap, label: 'What changed', color: 'cyan.400' },
                { icon: FiCheck, label: 'Positive signals', color: 'green.400' },
                { icon: FiTrendingDown, label: 'Negative signals', color: 'red.400' },
                { icon: FiEye, label: 'Not happening yet', color: 'gray.500' },
                { icon: FiTarget, label: 'What to watch', color: 'purple.400' },
                { icon: FiClock, label: 'Confidence level', color: 'yellow.400' },
              ].map((item, i) => (
                <HStack
                  key={i}
                  spacing={2}
                  p={3}
                  bg="rgba(255,255,255,0.02)"
                  borderRadius="md"
                  fontSize="sm"
                >
                  <Box as={item.icon} color={item.color} size="14px" flexShrink={0} />
                  <Text color="gray.300">{item.label}</Text>
                </HStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Recent Digests Preview + Archive */}
      <Box as="section" py={{ base: 10, md: 14 }} bg="#0a0a0f">
        <Container maxW="800px">
          <VStack spacing={6}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={2}>
                Recent issues
              </Text>
              <Heading as="h2" fontSize="xl" fontWeight="600" color="white">
                Published daily since January 2026
              </Heading>
            </Box>

            <VStack spacing={2} w="100%" maxW="500px">
              {/* TODO: Replace with actual recent digests from API */}
              {[
                { date: 'Jan 19', score: 8, label: 'Expansionary', tone: 'Bullish' },
                { date: 'Jan 18', score: 7, label: 'Mixed signals', tone: 'Neutral' },
                { date: 'Jan 17', score: 7, label: 'Stable', tone: 'Neutral' },
                { date: 'Jan 16', score: 6, label: 'Cautious', tone: 'Bearish' },
              ].map((item, i) => (
                <HStack
                  key={i}
                  w="100%"
                  justify="space-between"
                  p={3}
                  bg="rgba(255,255,255,0.02)"
                  borderRadius="md"
                  fontSize="sm"
                >
                  <Text color="gray.500">{item.date}</Text>
                  <HStack spacing={3}>
                    <Text color="gray.400">{item.label}</Text>
                    <Text color={item.tone === 'Bullish' ? 'green.400' : item.tone === 'Bearish' ? 'red.400' : 'gray.400'}>
                      {item.score}/10
                    </Text>
                  </HStack>
                </HStack>
              ))}
            </VStack>

            <Text fontSize="sm" color="gray.500">
              Subscribers get access to the full archive.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Data Sources */}
      <Box as="section" py={{ base: 10, md: 14 }} bg="#0f1014">
        <Container maxW="800px">
          <VStack spacing={6}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={2}>
                Our sources
              </Text>
              <Text color="gray.400" fontSize="md">
                We aggregate signals from sources you trust.
              </Text>
            </Box>

            <HStack spacing={8} flexWrap="wrap" justify="center" py={4}>
              {['Reuters', 'Bloomberg', 'SEC Filings', 'WSJ', 'FT', 'Earnings Calls'].map((source) => (
                <Text key={source} fontSize="sm" color="gray.600" fontWeight="500">
                  {source}
                </Text>
              ))}
            </HStack>

            <HStack spacing={6} flexWrap="wrap" justify="center" fontSize="xs" color="gray.500">
              <HStack spacing={1}><Box as={FiShield} /><Text>Public sources only</Text></HStack>
              <HStack spacing={1}><Box as={FiEye} /><Text>No paywalled scraping</Text></HStack>
              <HStack spacing={1}><Box as={FiClock} /><Text>Updated daily</Text></HStack>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Pricing - With Email Capture */}
      <Box as="section" id="pricing" py={{ base: 12, md: 16 }} bg="#0a0a0f">
        <Container maxW="500px">
          <VStack spacing={8}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={2}>
                Pricing
              </Text>
              <Heading as="h2" fontSize="2xl" fontWeight="600" color="white" mb={2}>
                Simple and fair.
              </Heading>
              <Text color="gray.400" fontSize="md">
                Same content for everyone. No tiers, no upsells.
              </Text>
            </Box>

            <Box
              w="100%"
              bg="rgba(255,255,255,0.02)"
              border="1px solid"
              borderColor="gray.800"
              borderRadius="xl"
              p={6}
            >
              <VStack spacing={5}>
                <VStack spacing={1}>
                  <HStack spacing={1} align="baseline">
                    <Text fontSize="4xl" fontWeight="600" color="white">$2</Text>
                    <Text color="gray.500" fontSize="md">/month</Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.500">or $20/year (2 months free)</Text>
                </VStack>

                <Divider borderColor="gray.800" />

                <VStack align="stretch" spacing={2} w="100%">
                  {[
                    'Daily digest in your inbox',
                    'Full archive access',
                    'All signal categories',
                    'Cancel with one click',
                  ].map((feature, i) => (
                    <HStack key={i} spacing={2} fontSize="sm">
                      <Box as={FiCheck} color="gray.500" flexShrink={0} />
                      <Text color="gray.400">{feature}</Text>
                    </HStack>
                  ))}
                </VStack>

                <Box w="100%" pt={2}>
                  <EmailCapture variant="minimal" />
                </Box>
              </VStack>
            </Box>

            <Text fontSize="xs" color="gray.600" textAlign="center">
              Payments secured by Stripe. Cancel anytime, no questions asked.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* FAQ - Expanded */}
      <Box as="section" py={{ base: 10, md: 14 }} bg="#0f1014">
        <Container maxW="600px">
          <VStack spacing={6}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={2}>
                Questions
              </Text>
            </Box>
            <Accordion allowMultiple w="100%">
              {[
                {
                  q: 'Should I make investment decisions based on this?',
                  a: "No. This is context, not advice. We help you understand what's happening in AI infrastructure, not what to do about it. Always do your own research and consult a financial advisor for investment decisions.",
                },
                {
                  q: 'How accurate is your scoring?',
                  a: "Our scores reflect signal strength based on publicly available data. We include confidence levels because we know we can be wrong. We also tell you what evidence would change our view — that's intellectual honesty.",
                },
                {
                  q: 'What if I disagree with your analysis?',
                  a: "That's fine — encouraged, even. We show our reasoning so you can form your own view. We're a lens to help you see clearly, not an oracle telling you what to think.",
                },
                {
                  q: 'How do I receive the digest?',
                  a: 'By email, every morning before US market open. You can also access all past digests in the subscriber archive.',
                },
                {
                  q: 'Can I cancel anytime?',
                  a: 'Yes, with one click. No hoops, no retention calls, no guilt trips. If it\'s not useful, you should cancel.',
                },
                {
                  q: 'What sources do you use?',
                  a: 'Reuters, Bloomberg, SEC filings, earnings call transcripts, WSJ, Financial Times, and other public sources. We don\'t scrape paywalled content.',
                },
              ].map((item, i) => (
                <AccordionItem
                  key={i}
                  border="1px solid"
                  borderColor="gray.800"
                  borderRadius="lg"
                  mb={2}
                  bg="rgba(255,255,255,0.02)"
                >
                  <AccordionButton py={4} px={4} _hover={{ bg: 'rgba(255,255,255,0.02)' }} borderRadius="lg">
                    <Box flex="1" textAlign="left" fontWeight="500" color="gray.200" fontSize="sm">
                      {item.q}
                    </Box>
                    <AccordionIcon color="gray.500" />
                  </AccordionButton>
                  <AccordionPanel pb={4} px={4} color="gray.400" fontSize="sm" lineHeight="1.7">
                    {item.a}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box as="footer" py={8} bg="#0a0a0f" borderTop="1px solid" borderColor="gray.900">
        <Container maxW="960px">
          <VStack spacing={4}>
            <HStack spacing={2}>
              <Box
                w={2}
                h={2}
                borderRadius="full"
                bg="cyan.400"
                animation={mounted ? `${pulse} 2s ease-in-out infinite` : undefined}
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
