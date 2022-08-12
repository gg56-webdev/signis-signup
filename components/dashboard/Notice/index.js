import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

export default function Notice() {
  return (
    <Alert status='warning' maxW='container.sm' mx='auto' borderRadius='md'>
      <AlertIcon />
      <AlertDescription>
        현재 신한카드, BC카드, 삼성카드, 현대카드, KB국민카드, 롯데카드, 하나카드(구외환, 구하나sk), NH농협카드로만
        결제가 가능합니다
      </AlertDescription>
    </Alert>
  );
}
