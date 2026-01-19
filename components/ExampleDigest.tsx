'use client'

import {
  Box,
  Text,
  VStack,
  HStack,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react'

// Signal strength indicator
const SignalDot = ({ strength }: { strength: 'strong' | 'mixed' | 'weak' }) => {
  const colors = {
    strong: 'green.400',
    mixed: 'yellow.400',
    weak: 'red.400',
  }
  return (
    <Box
      w={2}
      h={2}
      borderRadius="full"
      bg={colors[strength]}
      flexShrink={0}
      aria-label={`${strength} signal`}
    />
  )
}

export default function ExampleDigest() {
  return (
    <Box
      bg="rgba(15, 15, 20, 0.9)"
      border="1px solid"
      borderColor="gray.800"
      borderRadius="lg"
      p={{ base: 4, md: 5 }}
      maxW="600px"
      mx="auto"
      fontSize="sm"
      aria-label="Example digest preview"
    >
      <VStack align="stretch" spacing={4}>
        {/* Header */}
        <HStack justify="space-between" align="flex-start" flexWrap="wrap" gap={2}>
          <Box>
            <Text color="gray.500" fontSize="xs" letterSpacing="wide">
              AI INFRA PULSE · Jan 19, 2026
            </Text>
          </Box>
          <HStack spacing={3} fontSize="xs">
            <HStack spacing={1}>
              <Text color="green.400">🟢 8/10</Text>
            </HStack>
            {/* Neutral label instead of "Bullish" */}
            <Text color="gray.500">Expansionary · Near-term</Text>
          </HStack>
        </HStack>

        {/* Summary */}
        <Box
          bg="rgba(255,255,255,0.02)"
          borderRadius="md"
          p={3}
          borderLeft="2px solid"
          borderColor="gray.700"
        >
          <Text color="gray.300" lineHeight="1.7">
            Strong signals in foundry and memory. Regulatory uncertainty elevated. TSMC capex expansion is the headline. Watch Nvidia supply constraints.
          </Text>
        </Box>

        {/* TL;DR */}
        <Box>
          <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wide" mb={2}>
            Quick take
          </Text>
          <VStack align="stretch" spacing={1}>
            {[
              { topic: 'AI chip demand', signal: 'strong growth signals', positive: true },
              { topic: 'Nvidia supply', signal: 'regulatory risk', positive: false },
              { topic: 'TSMC capex', signal: 'expanding', positive: true },
            ].map((item, i) => (
              <HStack key={i} fontSize="xs" spacing={2} flexWrap="wrap">
                <Text color="gray.500">If you care about</Text>
                <Text color="white" fontWeight="500">{item.topic}</Text>
                <Text color="gray.500">→</Text>
                <Text color={item.positive ? 'green.400' : 'red.400'}>{item.signal}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        <Divider borderColor="gray.800" />

        {/* Signal Sources Grid */}
        <Box>
          <Text fontSize="xs" fontWeight="500" color="gray.500" textTransform="uppercase" letterSpacing="wide" mb={2}>
            Signal sources
          </Text>
          <SimpleGrid columns={2} spacing={2}>
            {[
              { name: 'Memory', strength: 'strong' as const, note: 'capex up' },
              { name: 'Foundry', strength: 'strong' as const, note: 'earnings beat' },
              { name: 'GPU', strength: 'weak' as const, note: 'supply tight' },
              { name: 'Regulation', strength: 'weak' as const, note: 'US-China risk' },
            ].map((item, i) => (
              <HStack key={i} spacing={2} fontSize="xs">
                <SignalDot strength={item.strength} />
                <Text color="gray.400">{item.name}</Text>
                <Text color="gray.600">· {item.note}</Text>
              </HStack>
            ))}
          </SimpleGrid>
        </Box>

        <Divider borderColor="gray.800" />

        {/* What Changed / Positive / Negative */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <Box>
            <Text fontSize="xs" fontWeight="500" color="cyan.500" mb={1.5}>What changed</Text>
            <VStack align="stretch" spacing={0.5}>
              {['OpenAI $10B Cerebras deal', 'TSMC record profit', 'SK Hynix accelerates fab'].map((item, i) => (
                <Text key={i} fontSize="xs" color="gray.400">• {item}</Text>
              ))}
            </VStack>
          </Box>
          <Box>
            <Text fontSize="xs" fontWeight="500" color="green.400" mb={1.5}>Positive</Text>
            <VStack align="stretch" spacing={0.5}>
              {['TSMC $250B US invest', 'Strong AI chip demand', 'Higgsfield $1.3B raise'].map((item, i) => (
                <Text key={i} fontSize="xs" color="gray.400">• {item}</Text>
              ))}
            </VStack>
          </Box>
          <Box>
            <Text fontSize="xs" fontWeight="500" color="red.400" mb={1.5}>Negative</Text>
            <VStack align="stretch" spacing={0.5}>
              {['Nvidia H200 halt', 'China customs ban', 'Regulatory overhang'].map((item, i) => (
                <Text key={i} fontSize="xs" color="gray.400">• {item}</Text>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>

        <Divider borderColor="gray.800" />

        {/* Footer meta */}
        <HStack justify="space-between" fontSize="xs" color="gray.500" flexWrap="wrap" gap={2}>
          <Text><Text as="span" color="gray.400">Confidence:</Text> Medium</Text>
          <Text><Text as="span" color="gray.400">Horizon:</Text> Near-term</Text>
          <Text><Text as="span" color="gray.400">Noise:</Text> Elevated</Text>
        </HStack>
      </VStack>
    </Box>
  )
}
