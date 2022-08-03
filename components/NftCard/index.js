import { Box, Button, Icon, Skeleton, Spinner, Tag, Text } from '@chakra-ui/react';
import Image from 'next/image';
import NLink from 'next/link';
import bracelet from '../../public/bracelet.webp';
import { usePrice } from '../../hooks/usePrice';

const PRICE_IN_USD = 9.99;

export default function NftCard({ text, userWallet, isPaid = false, isPurchasable = false, direction = 'row', size }) {
  const { ratesLoading, priceInKRW } = usePrice(PRICE_IN_USD);

  return (
    <Box
      display='flex'
      flexDir={{ base: 'column', sm: direction }}
      p='4'
      bg='gray.50'
      borderRadius='xl'
      shadow='lg'
      gap='4'
      border='1px'
      borderColor='blue.100'
      maxW='container.md'
      mx='auto'
      color='initial'
    >
      <Box
        shadow='outline'
        borderRadius='md'
        overflow='hidden'
        flexShrink='0'
        display='grid'
        placeItems='center'
        bg='white'
      >
        <Image
          width={size ? size : ''}
          height={size ? size : ''}
          src={bracelet}
          alt="3D render of Bracelet with Pope's Blessing"
          placeholder='blur'
        />
      </Box>
      <Box display='flex' flexDir='column' gap='2'>
        <Box as='strong' fontSize='xl' fontWeight='bold' color='brand.main'>
          {text.name}
        </Box>
        <Tag w='fit-content' variant='subtle' colorScheme='purple' size='lg' p='1' borderRadius='md'>
          <Icon mr='1' boxSize='4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              />
              <path strokeLinecap='round' strokeLinejoin='round' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
            </svg>
          </Icon>
          SIGNIS Metaverse
        </Tag>
        {isPurchasable && <Text>{text.description}</Text>}
        <Box display='flex' alignItems='center' mt='auto' fontSize='lg' fontWeight='bold' gap='2'>
          {!isPaid && (
            <>
              <Tag size='lg' colorScheme='blue' variant='outline' _before={{ content: "'$'" }} gap='1'>
                {PRICE_IN_USD}
              </Tag>
              {ratesLoading ? (
                <Skeleton
                  flexBasis='80px'
                  h='full'
                  borderRadius='lg'
                  colorScheme='blue'
                  startColor='gray.200'
                  endColor='blue.400'
                />
              ) : (
                <Tag size='lg' colorScheme='blue' variant='outline' _before={{ content: "'₩'" }} gap='1'>
                  {priceInKRW}
                </Tag>
              )}
            </>
          )}
        </Box>
        {!isPaid && (
          <Text fontSize='xs' _before={{ content: "'* '" }}>
            {text.disclaimer}
          </Text>
        )}
        {isPurchasable &&
          (isPaid ? (
            <>
              <Box fontSize='lg' fontWeight='bold' color='brand.main' fontFamily='mono'>
                {userWallet}
              </Box>
              <Text>{text.purchased}</Text>
            </>
          ) : (
            <NLink href='/dashboard/add-wallet' passHref>
              <Button as='a' colorScheme='blue' bg='brand.main'>
                {text.buy}
              </Button>
            </NLink>
          ))}
      </Box>
    </Box>
  );
}
