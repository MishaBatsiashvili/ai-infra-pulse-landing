'use client'

import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { useEffect, useState } from 'react'

// CSS keyframes for reliable pulse ring animation
const pulseRing = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
`

// CSS keyframes for orb pulsing
const orbPulse = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
`

// Individual pulse ring using CSS animation
// Using negative delay to start rings at different points in cycle
const PulseRing = ({ delay }: { delay: number }) => (
  <Box
    position="absolute"
    width="150px"
    height="150px"
    borderRadius="full"
    border="2px solid"
    borderColor="cyan.400"
    animation={`${pulseRing} 3s ease-out infinite`}
    sx={{
      // Negative delay makes animation start mid-cycle
      animationDelay: `-${delay}s`,
      boxShadow: '0 0 20px rgba(6, 182, 212, 0.5), inset 0 0 20px rgba(6, 182, 212, 0.2)',
    }}
  />
)

// Glowing orb using CSS animation
const GlowingOrb = ({ size, color, x, y, delay }: { size: number; color: string; x: string; y: string; delay: number }) => (
  <Box
    position="absolute"
    width={`${size}px`}
    height={`${size}px`}
    borderRadius="full"
    bg={color}
    filter="blur(40px)"
    left={x}
    top={y}
    animation={`${orbPulse} 4s ease-in-out infinite`}
    sx={{
      // Negative delay for orbs too
      animationDelay: `-${delay}s`,
    }}
  />
)

// Central glowing core
const GlowingCore = () => (
  <Box
    position="absolute"
    width="14px"
    height="14px"
    borderRadius="full"
    bg="white"
    zIndex={10}
    animation={`corePulse 2s ease-in-out infinite`}
    sx={{
      '@keyframes corePulse': {
        '0%, 100%': {
          transform: 'scale(1)',
          boxShadow: '0 0 30px rgba(6, 182, 212, 1), 0 0 60px rgba(6, 182, 212, 0.6), 0 0 90px rgba(6, 182, 212, 0.3)',
        },
        '50%': {
          transform: 'scale(1.3)',
          boxShadow: '0 0 40px rgba(6, 182, 212, 1), 0 0 80px rgba(6, 182, 212, 0.8), 0 0 120px rgba(6, 182, 212, 0.4)',
        },
      },
    }}
  />
)

export default function PulseAnimation() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <Box height="200px" />

  return (
    <Box
      position="relative"
      width="100%"
      height="200px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="visible"
    >
      {/* Background glow orbs - negative delays so they start visible */}
      <GlowingOrb size={200} color="rgba(6, 182, 212, 0.4)" x="10%" y="10%" delay={0} />
      <GlowingOrb size={150} color="rgba(139, 92, 246, 0.4)" x="70%" y="20%" delay={1.5} />
      <GlowingOrb size={180} color="rgba(16, 185, 129, 0.3)" x="40%" y="50%" delay={3} />

      {/* Pulse rings emanating from center - staggered with negative delays */}
      <Box
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        <PulseRing delay={0} />
        <PulseRing delay={0.75} />
        <PulseRing delay={1.5} />
        <PulseRing delay={2.25} />
      </Box>

      {/* Central glowing core */}
      <GlowingCore />
    </Box>
  )
}
