'use client'

import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

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
    />
  )
}

export default function ExampleDigest() {
  return (
    <MotionBox
      bg="rgba(15, 15, 20, 0.9)"
      border="1px solid"
      borderColor="gray.800"
      borderRadius="xl"
      p={{ base: 5, md: 6 }}
      maxW="650px"
      mx="auto"
      position="relative"
      overflow="hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <VStack align="stretch" spacing={5} position="relative">
        {/* Header */}
        <HStack justify="space-between" align="flex-start" flexWrap="wrap" gap={2}>
          <Box>
            <Text color="gray.500" fontSize="xs" mb={1.5} letterSpacing="wide">
              AI INFRA PULSE · Jan 19, 2026
            </Text>
            <HStack spacing={3}>
              <Badge 
                bg="rgba(34, 197, 94, 0.1)" 
                color="green.400" 
                fontSize="xs"
                px={2}
                py={0.5}
                borderRadius="md"
                fontWeight="500"
              >
                🟢 Score: 8/10
              </Badge>
              <Text fontSize="xs" color="gray.500">
                Bullish · Near-term
              </Text>
            </HStack>
          </Box>
        </HStack>

        {/* Summary */}
        <Box
          bg="rgba(255,255,255,0.02)"
          borderRadius="lg"
          p={4}
          borderLeft="2px solid"
          borderColor="cyan.800"
        >
          <Text fontSize="sm" color="gray.300" lineHeight="1.7">
            The AI infrastructure market shows strong growth signals, particularly in foundry and memory sectors. However, regulatory risks from U.S.-China tensions and Nvidia's supply constraints introduce uncertainty.
          </Text>
        </Box>

        {/* TL;DR */}
        <Box>
          <Text fontSize="xs" fontWeight="600" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={3}>
            Quick take
          </Text>
          <VStack align="stretch" spacing={2}>
            {[
              { topic: 'AI chip demand', signal: 'strong growth signals' },
              { topic: 'Nvidia supply', signal: 'risk from regulatory issues' },
              { topic: 'Foundry investments', signal: 'TSMC capex expansion is bullish' },
            ].map((item, i) => (
              <HStack key={i} fontSize="sm" spacing={2}>
                <Text color="gray.500">If you care about</Text>
                <Text color="white" fontWeight="500">{item.topic}</Text>
                <Text color="gray.500">→</Text>
                <Text color="gray.300">{item.signal}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        <Divider borderColor="gray.800" />

        {/* Signal Sources */}
        <Box>
          <Text fontSize="xs" fontWeight="600" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={3}>
            Signal sources
          </Text>
          <SimpleGrid columns={2} spacing={2}>
            {[
              { name: 'Memory', strength: 'strong' as const, note: 'capex expanding' },
              { name: 'Foundry', strength: 'strong' as const, note: 'earnings beat' },
              { name: 'GPU', strength: 'weak' as const, note: 'supply constraints' },
              { name: 'Data Center', strength: 'mixed' as const, note: 'regulatory risks' },
              { name: 'Regulation', strength: 'weak' as const, note: 'elevated risks' },
              { name: 'Macro', strength: 'mixed' as const, note: 'geopolitical tension' },
            ].map((item, i) => (
              <HStack key={i} spacing={2} fontSize="xs">
                <SignalDot strength={item.strength} />
                <Text color="gray.400">{item.name}</Text>
                <Text color="gray.600">·</Text>
                <Text color="gray.500">{item.note}</Text>
              </HStack>
            ))}
          </SimpleGrid>
        </Box>

        <Divider borderColor="gray.800" />

        {/* What Changed / Positive / Negative */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <Box>
            <Text fontSize="xs" fontWeight="600" color="cyan.500" mb={2}>
              What changed
            </Text>
            <VStack align="stretch" spacing={1.5}>
              {[
                'OpenAI $10B Cerebras deal',
                'TSMC record profit surge',
                'SK Hynix accelerates fab',
              ].map((item, i) => (
                <Text key={i} fontSize="xs" color="gray.400">• {item}</Text>
              ))}
            </VStack>
          </Box>
          <Box>
            <Text fontSize="xs" fontWeight="600" color="green.400" mb={2}>
              Positive signals
            </Text>
            <VStack align="stretch" spacing={1.5}>
              {[
                'TSMC $250B US investment',
                'Strong AI chip demand',
                'Higgsfield $1.3B valuation',
              ].map((item, i) => (
                <Text key={i} fontSize="xs" color="gray.400">• {item}</Text>
              ))}
            </VStack>
          </Box>
          <Box>
            <Text fontSize="xs" fontWeight="600" color="red.400" mb={2}>
              Negative signals
            </Text>
            <VStack align="stretch" spacing={1.5}>
              {[
                'Nvidia H200 production halt',
                'China customs Nvidia ban',
                'US-China regulatory risk',
              ].map((item, i) => (
                <Text key={i} fontSize="xs" color="gray.400">• {item}</Text>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>

        <Divider borderColor="gray.800" />

        {/* Watch / Not Happening */}
        <HStack align="flex-start" spacing={6} flexWrap="wrap">
          <Box flex={1} minW="200px">
            <Text fontSize="xs" fontWeight="600" color="purple.400" mb={2}>
              Watch next
            </Text>
            <VStack align="stretch" spacing={1}>
              {[
                'TSMC earnings report',
                'US-China tech developments',
                'Nvidia supply response',
              ].map((item, i) => (
                <Text key={i} fontSize="xs" color="gray.400">→ {item}</Text>
              ))}
            </VStack>
          </Box>
          <Box flex={1} minW="200px">
            <Text fontSize="xs" fontWeight="600" color="gray.500" mb={2}>
              Not happening yet
            </Text>
            <VStack align="stretch" spacing={1}>
              {[
                'No major order cancellations',
                'No significant capacity cuts',
              ].map((item, i) => (
                <Text key={i} fontSize="xs" color="gray.500">○ {item}</Text>
              ))}
            </VStack>
          </Box>
        </HStack>

        <Divider borderColor="gray.800" />

        {/* Footer */}
        <HStack justify="space-between" fontSize="xs" color="gray.500">
          <Text>
            <Text as="span" color="gray.400">Confidence:</Text> Medium
          </Text>
          <Text>
            <Text as="span" color="gray.400">Horizon:</Text> Near-term (weeks)
          </Text>
          <Text>
            <Text as="span" color="gray.400">Noise:</Text> Elevated
          </Text>
        </HStack>
      </VStack>
    </MotionBox>
  )
}
