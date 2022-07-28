import { Box, Text, Container, Heading, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import EventPopup from './EventPopup';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionContainer = motion(Container);
const MotionText = motion(Text);

const containerVariants = {
  offscreen: {
    opacity: 0,
    scale: 0.95,
  },
  onscreen: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, staggerChildren: 1 },
  },
};

const headingVariants = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    transition: { duration: 1, delay: 1, staggerChildren: 0.15 },
    opacity: 1,
  },
};

const lettersVariants = {
  offscreen: { opacity: 0, y: 5 },
  onscreen: { opacity: 1, y: 0 },
};

const textVariants = {
  offscreen: {
    opacity: 0,
    transform: 'translate(-50%, 150%)',
  },
  onscreen: {
    opacity: 1,
    transform: 'translate(-50%, 50%)',
    transition: { duration: 1, delay: 3 },
  },
};

const glow = keyframes`
from {
     text-shadow: 0 0 8px hsl(230 37% 50% / 100%);
      -webkit-text-stroke-color: hsl(230 37% 80% / 100%);
  }
  to {
     text-shadow: 0 0 24px hsl(230 50% 100% / 100%);
    -webkit-text-stroke-color: hsl(230 37% 90% / 100%);}`;

export default function Promo({ text }) {
  return (
    <MotionBox
      as='section'
      h='clamp(670px, 90vh, 800px)'
      backgroundImage='linear-gradient(rgb(0 0 0 / 0.15),rgb(0 0 0 / 0.20)), url(hands.jpg)'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
      backgroundPosition='center'
      py='20'
      px='1'
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.6 }}
    >
      <MotionContainer
        variants={containerVariants}
        pos='relative'
        display='flex'
        flexDir='column'
        maxW='800px'
        pt='10'
        textAlign='center'
        h='full'
        isolation='isolate'
        _after={{
          zIndex: -1,
          borderRadius: '3xl',
          border: '6px solid white',
          content: `''`,
          pos: 'absolute',
          top: 0,
          left: 0,
          w: '100%',
          h: '100%',
          clipPath: {
            base: 'polygon(104% -4%, 104% 104%, 95% 104%, 95% 90%, 5% 90%, 5% 104%, -4% 104%, -4% -4%)',
            sm: 'polygon(104% -4%, 104% 104%, 87% 104%, 87% 90%, 13% 90%, 13% 104%, -4% 104%, -4% -4%)',
            md: 'polygon(104% -4%, 104% 104%, 75% 104%, 75% 90%, 25% 90%, 25% 104%, -4% 104%, -4% -4%)',
          },
          boxShadow: '0 0 17px #fff, inset 0 0 17px #fff',
        }}
      >
        <MotionHeading
          variants={headingVariants}
          letterSpacing='2px'
          fontWeight='500'
          textTransform='uppercase'
          fontSize={{ base: '1.75rem', md: '2.25rem' }}
          // transform='skew(-10deg)'
          sx={{
            // WebkitTextStrokeWidth: '1.5px',
            WebkitTextStrokeColor: 'hsl(230 37% 65% / 100%)',
            WebkitTextFillColor: 'white',
            WebkitBackgroundClip: 'text',
            textShadow: '0px 0px 15px hsl(230 37% 25% / 100%)',
          }}
        >
          {text.h2.split('').map((l, i) => (
            <MotionBox variants={lettersVariants} key={`${l}-${i}`} as='span'>
              {l}
            </MotionBox>
          ))}
        </MotionHeading>

        {/* <MotionText
          variants={textVariants}
          w='fit-content'
          letterSpacing='3px'
          textAlign='center'
          pos='absolute'
          bottom='1'
          left='50%'
          transform='translate(-50%, 50%) skew(-10deg)'
          zIndex='10'
          px='0.2em'
          fontWeight='700'
          fontFamily='sans-serif'
          textTransform='uppercase'
          fontSize={{ base: '2rem', sm: '2.25rem', md: '2.5rem' }}
          animation={`${glow} 1s ease-in-out infinite alternate`}
          sx={{
            WebkitTextStrokeWidth: '2px',
            WebkitTextStrokeColor: 'hsl(230 37% 80% / 100%)',
            WebkitTextFillColor: 'transparent',
            // 'textShadow': '0 0 8px hsl(230 37% 50% / 100%), 0 0 20px hsl(230 37% 37% / 100%)',
          }}
        >
          {text.text}
        </MotionText> */}
        <EventPopup />
      </MotionContainer>
    </MotionBox>
  );
}
