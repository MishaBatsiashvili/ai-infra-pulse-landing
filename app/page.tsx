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
  FiUsers,
  FiMail,
} from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import ExampleDigest from '@/components/ExampleDigest'

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
`

// Waitlist signup component - single unified CTA across the page
function WaitlistSignup({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
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
    // TODO: Connect to waitlist API (e.g., Buttondown, ConvertKit, or custom endpoint)
    await new Promise(r => setTimeout(r, 500))
    localStorage.setItem('ai-infra-pulse-waitlist', email)
    setIsSubmitted(true)
    setIsSubmitting(false)
    toast({ title: "You're on the list", description: "We'll email you when we launch.", status: 'success', duration: 4000 })
  }

  if (isSubmitted) {
    return (
      <HStack spacing={2} justify="center" py={2}>
        <Box as={FiCheck} color="cyan.400" />
        <Text fontSize="sm" color="cyan.400">You're on the waitlist</Text>
      </HStack>
    )
  }

  return (
    <Box as="form" onSubmit={handleSubmit} w="100%">
      <FormControl>
        <Box
          position="relative"
          borderRadius="full"
          bg="rgba(255,255,255,0.03)"
          border="1px solid"
          borderColor={isFocused ? 'gray.600' : 'gray.800'}
          p="4px"
          transition="all 0.2s"
          _hover={{ borderColor: 'gray.700' }}
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
              h={variant === 'compact' ? '36px' : '42px'}
              borderRadius="full"
              aria-label="Email address for waitlist"
            />
            <Button
              type="submit"
              bg="white"
              color="gray.900"
              fontSize="sm"
              fontWeight="500"
              h={variant === 'compact' ? '36px' : '42px'}
              px={variant === 'compact' ? 4 : 5}
              borderRadius="full"
              isLoading={isSubmitting}
              loadingText=""
              _hover={{ bg: 'gray.100' }}
              _active={{ bg: 'gray.200' }}
              flexShrink={0}
              transition="all 0.15s"
            >
              Join the waitlist
            </Button>
          </HStack>
        </Box>
        <Text fontSize="xs" color="gray.600" mt={3} textAlign="center" letterSpacing="wide">
          Early access · No spam · Unsubscribe anytime
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
      
      {/* 1. HERO SECTION */}
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
            {/* Coming soon indicator */}
            <HStack spacing={2} color="gray.500" fontSize="sm">
              <Box
                w={2}
                h={2}
                borderRadius="full"
                bg="cyan.400"
                animation={mounted ? `${pulse} 2s ease-in-out infinite` : undefined}
              />
              <Text>Coming soon</Text>
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
              A calm, 2-minute daily digest on AI infrastructure — compute, memory, data centers, regulation. Situational awareness, not investment advice.
            </Text>

            {/* Single Primary CTA */}
            <Box w="100%" maxW="420px" pt={4}>
              <WaitlistSignup />
            </Box>

            {/* Subtle secondary link */}
            <Button
              variant="link"
              color="gray.500"
              fontSize="sm"
              fontWeight="400"
              onClick={() => scrollToSection('example')}
              _hover={{ color: 'gray.300' }}
              aria-label="See a sample digest"
            >
              See a sample digest ↓
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* 2. WHAT IT IS / IS NOT */}
      <Box as="section" py={{ base: 10, md: 14 }} bg="#0f1014">
        <Container maxW="800px">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box>
              <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={3}>
                What it is
              </Text>
              <Text color="gray.300" fontSize="md" lineHeight="1.8" mb={4}>
                A short daily digest that tracks AI infrastructure signals — supply chains, capex, chips, and policy — then summarizes what changed.
              </Text>
              <List spacing={2}>
                {[
                  { icon: FiServer, text: 'Memory & compute supply' },
                  { icon: FiActivity, text: 'Data center expansion' },
                  { icon: FiShield, text: 'Regulatory shifts' },
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
                  Not stock picks. Not buy/sell signals. Not price predictions. This is <Text as="span" color="gray.200" fontWeight="500">situational awareness</Text> — context to help you think, not instructions to follow.
                </Text>
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* 3. SAMPLE DIGEST */}
      <Box as="section" id="example" py={{ base: 10, md: 14 }} bg="#0a0a0f">
        <Container maxW="960px">
          <VStack spacing={6}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={2}>
                Example digest (abridged)
              </Text>
              <Heading as="h2" fontSize="xl" fontWeight="600" color="white">
                Here's what it looks like.
              </Heading>
            </Box>
            <ExampleDigest />
            {/* Disclaimer */}
            <Text fontSize="xs" color="gray.600" textAlign="center" maxW="400px">
              Illustrative example. Signals may be revised as new data emerges.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* 4. HOW IT WORKS - Method Transparency */}
      <Box as="section" py={{ base: 10, md: 14 }} bg="#0f1014">
        <Container maxW="800px">
          <VStack spacing={6}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={2}>
                Our approach
              </Text>
              <Heading as="h2" fontSize="xl" fontWeight="600" color="white">
                How AI Infra Pulse works
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
              <VStack align="stretch" spacing={5}>
                {/* What we track */}
                <Box>
                  <Text fontWeight="500" color="white" fontSize="sm" mb={2}>What we track</Text>
                  <Text color="gray.400" fontSize="sm" lineHeight="1.8">
                    Six signal categories: memory supply, GPU availability, foundry capacity, data center expansion, regulatory changes, and macro conditions. We look at public sources — Reuters, Bloomberg, SEC filings, earnings calls.
                  </Text>
                </Box>

                <Divider borderColor="gray.800" />

                {/* How the score works */}
                <Box>
                  <Text fontWeight="500" color="white" fontSize="sm" mb={2}>How the pulse score works</Text>
                  <Text color="gray.400" fontSize="sm" lineHeight="1.8" mb={3}>
                    The 1–10 score is directional, not precise. It reflects overall signal strength — how many sources confirm a trend, and how clear the data is. The score is coarse and slow-moving; small daily changes rarely matter.
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                    <VStack align="stretch" spacing={1} fontSize="xs" color="gray.400">
                      <HStack><Box w={2} h={2} bg="green.400" borderRadius="full" /><Text>Strong — multiple confirming sources</Text></HStack>
                      <HStack><Box w={2} h={2} bg="yellow.400" borderRadius="full" /><Text>Mixed — conflicting or unclear signals</Text></HStack>
                      <HStack><Box w={2} h={2} bg="red.400" borderRadius="full" /><Text>Weak — concerning indicators</Text></HStack>
                    </VStack>
                    <VStack align="stretch" spacing={1} fontSize="xs" color="gray.400">
                      <Text>• <Text as="span" color="gray.300">High confidence</Text> — Clear data, low noise</Text>
                      <Text>• <Text as="span" color="gray.300">Medium confidence</Text> — Some uncertainty</Text>
                      <Text>• <Text as="span" color="gray.300">Low confidence</Text> — Elevated noise</Text>
                    </VStack>
                  </SimpleGrid>
                </Box>

                <Divider borderColor="gray.800" />

                {/* What "noise" means */}
                <Box>
                  <Text fontWeight="500" color="white" fontSize="sm" mb={2}>What "noise" means</Text>
                  <Text color="gray.400" fontSize="sm" lineHeight="1.8">
                    Noise reflects how much conflicting or unverifiable information is in the news cycle. High noise = harder to extract signal. We flag it so you know when to wait for more clarity.
                  </Text>
                </Box>

                <Divider borderColor="gray.800" />

                {/* No material change */}
                <Box>
                  <Text fontWeight="500" color="white" fontSize="sm" mb={2}>When nothing changed</Text>
                  <Text color="gray.400" fontSize="sm" lineHeight="1.8">
                    If we don't see material movement, we say so: "No significant change." We won't manufacture drama to fill space.
                  </Text>
                </Box>

                <Divider borderColor="gray.800" />

                {/* We may be wrong */}
                <Box bg="rgba(234, 179, 8, 0.05)" p={4} borderRadius="md" borderLeft="2px solid" borderColor="yellow.600">
                  <HStack spacing={2} mb={2}>
                    <Box as={FiInfo} color="yellow.500" />
                    <Text fontWeight="500" color="yellow.500" fontSize="sm">We may be wrong</Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.400" lineHeight="1.7">
                    Our analysis is interpretation, not fact. We include confidence levels and "what would change our mind" specifically because we know we can miss things. We'll say so when we're uncertain or when we've revised a previous call.
                  </Text>
                </Box>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* 5. WHO THIS IS FOR */}
      <Box as="section" py={{ base: 10, md: 14 }} bg="#0a0a0f">
        <Container maxW="700px">
          <VStack spacing={6}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={2}>
                Who it's for
              </Text>
              <Heading as="h2" fontSize="xl" fontWeight="600" color="white">
                Built for people who want context, not noise.
              </Heading>
            </Box>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="100%">
              {[
                { icon: FiUsers, label: 'Engineers', desc: 'tracking infra trends that affect your stack' },
                { icon: FiTarget, label: 'Founders', desc: 'staying aware of the landscape you build in' },
                { icon: FiEye, label: 'Researchers', desc: 'monitoring signals without reading everything' },
              ].map((item, i) => (
                <Box
                  key={i}
                  p={4}
                  bg="rgba(255,255,255,0.02)"
                  borderRadius="lg"
                  textAlign="center"
                >
                  <Box as={item.icon} color="gray.500" size="20px" mx="auto" mb={2} />
                  <Text color="white" fontSize="sm" fontWeight="500" mb={1}>{item.label}</Text>
                  <Text color="gray.500" fontSize="xs">{item.desc}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* 6. WHAT YOU'LL GET AT LAUNCH */}
      <Box as="section" py={{ base: 10, md: 14 }} bg="#0f1014">
        <Container maxW="700px">
          <VStack spacing={6}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={2}>
                At launch
              </Text>
              <Heading as="h2" fontSize="xl" fontWeight="600" color="white">
                What you'll get
              </Heading>
            </Box>
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3} w="100%">
              {[
                { icon: FiMail, label: 'Daily email digest', color: 'cyan.400' },
                { icon: FiZap, label: 'What changed', color: 'cyan.400' },
                { icon: FiCheck, label: 'Positive signals', color: 'green.400' },
                { icon: FiTrendingDown, label: 'Negative signals', color: 'red.400' },
                { icon: FiEye, label: 'Not happening yet', color: 'gray.500' },
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

            {/* Sources */}
            <Box pt={4}>
              <Text fontSize="xs" color="gray.500" textAlign="center" mb={3}>
                Built on public sources you trust
              </Text>
              <HStack spacing={6} flexWrap="wrap" justify="center">
                {['Reuters', 'Bloomberg', 'SEC Filings', 'WSJ', 'FT', 'Earnings Calls'].map((source) => (
                  <Text key={source} fontSize="xs" color="gray.600" fontWeight="500">
                    {source}
                  </Text>
                ))}
              </HStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* 7. EARLY ACCESS / PRICING */}
      <Box as="section" id="waitlist" py={{ base: 12, md: 16 }} bg="#0a0a0f">
        <Container maxW="500px">
          <VStack spacing={6}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={2}>
                Early access
              </Text>
              <Heading as="h2" fontSize="2xl" fontWeight="600" color="white" mb={2}>
                Join the waitlist
              </Heading>
              <Text color="gray.400" fontSize="md" lineHeight="1.7">
                We're launching soon. Get on the list to be notified first.
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
                {/* Planned pricing info */}
                <Box textAlign="center">
                  <Text fontSize="sm" color="gray.400" mb={1}>
                    Planned pricing at launch
                  </Text>
                  <HStack spacing={1} justify="center" align="baseline">
                    <Text fontSize="3xl" fontWeight="600" color="white">$5</Text>
                    <Text color="gray.500" fontSize="md">/month</Text>
                  </HStack>
                </Box>

                <Divider borderColor="gray.800" />

                <VStack align="stretch" spacing={2} w="100%">
                  {[
                    'Daily digest in your inbox',
                    'Full archive access',
                    'All signal categories',
                  ].map((feature, i) => (
                    <HStack key={i} spacing={2} fontSize="sm">
                      <Box as={FiCheck} color="gray.500" flexShrink={0} />
                      <Text color="gray.400">{feature}</Text>
                    </HStack>
                  ))}
                </VStack>

                <Box w="100%" pt={2}>
                  <WaitlistSignup variant="compact" />
                </Box>
              </VStack>
            </Box>

            <Text fontSize="xs" color="gray.600" textAlign="center">
              Early waitlist members will receive a launch discount.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* 8. FAQ */}
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
                  q: 'Is this investment advice?',
                  a: "No. This is context, not advice. We help you understand what's happening in AI infrastructure, not what to do about it. We don't make recommendations — just observations with confidence levels.",
                },
                {
                  q: 'How is this different from reading the news?',
                  a: "We filter and structure. Instead of scanning dozens of sources, you get a 2-minute summary of what actually changed — and what didn't. We focus on signal, not noise.",
                },
                {
                  q: 'How do you decide what to include?',
                  a: 'We track six categories: memory, GPUs, foundries, data centers, regulation, and macro. If something materially changed in one of those areas, it goes in. If nothing changed, we say so.',
                },
                {
                  q: "What if you're wrong?",
                  a: "We will be, sometimes. That's why we include confidence levels, flag uncertainty, and tell you what would change our view. We also note when we revise a previous assessment.",
                },
                {
                  q: 'When will this launch?',
                  a: "Soon. Join the waitlist to be notified. Early members will get a discount on the launch price.",
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
