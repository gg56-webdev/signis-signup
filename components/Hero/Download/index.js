import { Box, Link } from '@chakra-ui/react';
import gp from '../../../public/download/gp.svg';
import as from '../../../public/download/as.svg';
import Image from 'next/future/image';

export default function Download() {
  return (
    <Box display='flex' mt='8' gap='4' justifyContent='center' alignItems='center'>
      <Link href='https://url.kr/qfjyp4' isExternal _hover={{ transform: 'scale(1.05)' }}>
        <Image src={gp} alt='Download from Google Play' width='155' />
      </Link>
      <Link href='https://url.kr/k7jbu5' isExternal _hover={{ transform: 'scale(1.05)' }}>
        <Image src={as} alt='Download from App Store' width='155' />
      </Link>
    </Box>
  );
}
