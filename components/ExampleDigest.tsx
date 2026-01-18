'use client'

import {
  Box,
  Text,
  VStack,
  Badge,
  Divider,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`

const borderGlow = keyframes`
  0%, 100% { 
    border-color: rgba(6, 182, 212, 0.3);
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.1), inset 0 0 20px rgba(6, 182, 212, 0.02);
  }
  50% { 
    border-color: rgba(6, 182, 212, 0.5);
    box-shadow: 0 0 40px rgba(6, 182, 212, 0.15), inset 0 0 30px rgba(6, 182, 212, 0.03);
  }
`

export default function ExampleDigest() {
  return (
    <MotionBox
      bg="rgba(10, 10, 15, 0.8)"
      border="1px solid"
      borderColor="cyan.900"
      borderRadius="lg"
      p={6}
      fontFamily="mono"
      fontSize="sm"
      maxW="600px"
      mx="auto"
      position="relative"
      overflow="hidden"
      animation={`${borderGlow} 4s ease-in-out infinite`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Scanline effect */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="30%"
        bgGradient="linear(to-b, rgba(6, 182, 212, 0.03) 0%, transparent 100%)"
        animation={`${scanline} 4s linear infinite`}
        pointerEvents="none"
      />
      
      {/* Corner accents */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="20px"
        height="20px"
        borderTop="2px solid"
        borderLeft="2px solid"
        borderColor="cyan.500"
        borderTopLeftRadius="lg"
      />
      <Box
        position="absolute"
        top={0}
        right={0}
        width="20px"
        height="20px"
        borderTop="2px solid"
        borderRight="2px solid"
        borderColor="cyan.500"
        borderTopRightRadius="lg"
      />
      <Box
        position="absolute"
        bottom={0}
        left={0}
        width="20px"
        height="20px"
        borderBottom="2px solid"
        borderLeft="2px solid"
        borderColor="cyan.500"
        borderBottomLeftRadius="lg"
      />
      <Box
        position="absolute"
        bottom={0}
        right={0}
        width="20px"
        height="20px"
        borderBottom="2px solid"
        borderRight="2px solid"
        borderColor="cyan.500"
        borderBottomRightRadius="lg"
      />

      <VStack align="stretch" spacing={4} position="relative">
        <Box>
          <Text color="gray.500" fontSize="xs" mb={1} letterSpacing="wider">
            AI INFRA PULSE · Jan 18, 2026
          </Text>
          <Badge 
            bg="rgba(234, 179, 8, 0.15)" 
            color="yellow.400" 
            fontSize="xs"
            border="1px solid"
            borderColor="yellow.800"
          >
            MIXED SIGNAL
          </Badge>
        </Box>

        <Divider borderColor="gray.800" />

        <Box>
          <Text fontWeight="600" color="cyan.400" mb={2}>
            What changed
          </Text>
          <Text color="gray.400" fontSize="sm" lineHeight="1.8">
            • TSMC raised Q1 capex guidance by 8%
            <br />
            • EU AI Act enforcement begins March 1
            <br />
            • Hyperscaler power purchase agreements slowing in APAC
          </Text>
        </Box>

        <Box>
          <Text fontWeight="600" color="green.400" mb={2}>
            + Positive signals
          </Text>
          <Text color="gray.400" fontSize="sm" lineHeight="1.8">
            • Memory pricing stabilizing after 6-month decline
            <br />
            • New data center permits up 12% YoY (NA)
          </Text>
        </Box>

        <Box>
          <Text fontWeight="600" color="red.400" mb={2}>
            − Negative signals
          </Text>
          <Text color="gray.400" fontSize="sm" lineHeight="1.8">
            • Grid interconnect delays in 3 major US markets
            <br />
            • Inference chip lead times extending
          </Text>
        </Box>

        <Box>
          <Text fontWeight="600" color="gray.500" mb={2}>
            ○ Not happening yet
          </Text>
          <Text color="gray.400" fontSize="sm" lineHeight="1.8">
            • No major hyperscaler capex cuts announced
            <br />
            • Enterprise AI adoption still growing (surveys)
          </Text>
        </Box>

        <Box>
          <Text fontWeight="600" color="purple.400" mb={2}>
            → Watch next
          </Text>
          <Text color="gray.400" fontSize="sm" lineHeight="1.8">
            • NVIDIA earnings call (Feb 21)
            <br />
            • EU compliance deadline responses
          </Text>
        </Box>

        <Divider borderColor="gray.800" />

        <Box>
          <Text fontSize="xs" color="gray.500">
            <Text as="span" color="cyan.500">Confidence:</Text> Medium · <Text as="span" color="cyan.500">Horizon:</Text> 2-4 weeks
          </Text>
        </Box>
      </VStack>
    </MotionBox>
  )
}
