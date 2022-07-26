import { useReducer } from 'react';
import {
  OrderedList,
  ListItem,
  Text,
  Flex,
  Button,
  Input,
  Checkbox,
  InputGroup,
  InputRightElement,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Container,
  Heading,
  useDisclosure,
  Collapse,
  InputLeftAddon,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useUserContext } from '../context/user';
import { getTranslation } from '../utils/getTranslation';
import { useRouter } from 'next/router';

export async function getStaticProps({ locale }) {
  const text = await getTranslation(locale, 'enter');
  return { props: { text } };
}

export default function Enter({ text: { form, head } }) {
  const { signUp, login, resetPassword } = useUserContext();
  const { push, locale } = useRouter();
  const { isOpen: isOpenTerms, onToggle } = useDisclosure();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { device_type, name, phone_number, email, password, screen, loading, showPassword, error, alert, disabled } =
    state;

  const handleScreenSwitch = (screen) => dispatch({ type: FORM_ACTIONS.SWITCH_SCREEN, payload: screen });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: FORM_ACTIONS.TOGGLE_LOADING });
      switch (screen) {
        case 'signup':
          const userData = { device_type, name, phone_number, email };
          await signUp(email, password, userData);
          push('/dashboard', '/dashboard', { locale });
          break;
        case 'reset':
          await resetPassword(email);
          dispatch({ type: FORM_ACTIONS.INPUT, payload: ['alert', form.reset.alert] });
          dispatch({ type: FORM_ACTIONS.INPUT, payload: ['disabled', true] });
          break;
        default:
          await login(email, password);
          push('/dashboard', '/dashboard', { locale });
          break;
      }
    } catch (err) {
      console.error(err);
      let [, error] = err.code.split('/');
      error = error.split('-').join(' ');
      dispatch({ type: FORM_ACTIONS.SET_ERROR, payload: error });
    } finally {
      dispatch({ type: FORM_ACTIONS.TOGGLE_LOADING });
    }
  };

  return (
    <>
      <Head>
        <title>{head.title}</title>
      </Head>
      <Container
        as='form'
        maxW='container.sm'
        display='flex'
        flexDir='column'
        bg='white'
        color='initial'
        gap='4'
        my='10'
        borderRadius='md'
        shadow='md'
        py='4'
        px='6'
        onSubmit={handleSubmit}
      >
        <Heading>{form[screen].heading}</Heading>

        {screen === 'signup' && (
          <>
            <FormControl isRequired>
              <FormLabel htmlFor='device_type'>{form.device_type.label}</FormLabel>
              <RadioGroup
                display='flex'
                gap='10'
                name='device_type'
                onChange={(e) => dispatch({ type: FORM_ACTIONS.INPUT, payload: ['device_type', e] })}
              >
                <Radio value='iOS' isRequired>
                  {form.device_type.radios.ios}
                </Radio>
                <Radio value='Android' isRequired>
                  {form.device_type.radios.android}
                </Radio>
              </RadioGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor='name'>{form.name}</FormLabel>
              <Input
                id='name'
                name='name'
                type='text'
                onChange={(e) => dispatch({ type: FORM_ACTIONS.INPUT, payload: ['name', e.target.value] })}
              />
            </FormControl>
            {locale === 'ko' && (
              <FormControl isRequired>
                <FormLabel htmlFor='phone_number'>{form.phone_number}</FormLabel>
                <InputGroup>
                  <InputLeftAddon children='010' />
                  <Input
                    id='phone_number'
                    name='phone_number'
                    type='tel'
                    placeholder='####-####'
                    pattern='[0-9]{4}[- ]?[0-9]{4}'
                    onChange={(e) =>
                      dispatch({ type: FORM_ACTIONS.INPUT, payload: ['phone_number', '010' + e.target.value] })
                    }
                  />
                </InputGroup>
              </FormControl>
            )}
          </>
        )}
        <FormControl isRequired>
          <FormLabel htmlFor='email'>{form.email}</FormLabel>
          <Input
            id='email'
            name='email'
            autoComplete='username'
            type='email'
            value={email}
            onChange={(e) => dispatch({ type: FORM_ACTIONS.INPUT, payload: ['email', e.target.value] })}
          />
        </FormControl>
        {screen !== 'reset' && (
          <Flex flexDir='column' gap='1'>
            <FormControl isRequired>
              <FormLabel htmlFor={screen === 'signup' ? 'new-password' : 'current-password'}>{form.password}</FormLabel>
              <InputGroup>
                <Input
                  id={screen === 'signup' ? 'new-password' : 'current-password'}
                  name={screen === 'signup' ? 'new-password' : 'current-password'}
                  pr='16'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={screen === 'signup' ? 'new-password' : 'current-password'}
                  minLength={8}
                  value={password}
                  onChange={(e) => dispatch({ type: FORM_ACTIONS.INPUT, payload: ['password', e.target.value] })}
                />
                <InputRightElement w='16'>
                  <Button size='xs' onClick={() => dispatch({ type: FORM_ACTIONS.TOGGLE_SHOW_PASSWORD })}>
                    {showPassword ? 'hide' : 'show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {screen === 'login' && (
              <Button
                w='fit-content'
                alignSelf='end'
                size='sm'
                variant='ghost'
                colorScheme='blue'
                onClick={() => handleScreenSwitch('reset')}
              >
                {form.forgot}
              </Button>
            )}
          </Flex>
        )}
        {screen === 'signup' && (
          <>
            <Flex gap='2'>
              <FormControl display='inline-flex' gap='2' w='auto'>
                <Checkbox isRequired size='lg' type='checkbox' name='agree_to_terms' id='agree_to_terms' />
                <FormLabel
                  htmlFor='agree_to_terms'
                  m='0'
                  _after={{ content: "'*'", color: 'red.500', marginInlineStart: 1 }}
                >
                  {form.terms.label}
                </FormLabel>
              </FormControl>
              <Button
                color='blue.300'
                variant='link'
                onClick={onToggle}
                _before={{ content: `'['` }}
                _after={{ content: `']'` }}
              >
                {form.terms.link}
              </Button>
            </Flex>
            <Collapse in={isOpenTerms} animateOpacity>
              <OrderedList p='2' bg='blue.50' rounded='md' m='0' listStylePos='inside' fontSize='sm'>
                {form.terms.ul.map((li, i) => (
                  <ListItem key={i} whiteSpace='pre-wrap' sx={{ '& + li': { mt: '4' } }}>
                    {li}
                  </ListItem>
                ))}
              </OrderedList>
            </Collapse>
          </>
        )}
        <Stack mt='2'>
          {error && (
            <Alert status='error' borderRadius='md'>
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
          {alert && (
            <Alert status='info' borderRadius='md'>
              <AlertIcon />
              <AlertDescription fontSize='sm'>{alert}</AlertDescription>
            </Alert>
          )}
          <Button isLoading={loading} isDisabled={error || disabled} colorScheme='blue' type='submit'>
            {form[screen].action}
          </Button>
          <Button
            colorScheme='blue'
            variant='ghost'
            isDisabled={loading}
            onClick={() => dispatch({ type: FORM_ACTIONS.SWITCH_SIGNUP_LOGIN })}
          >
            {form[screen].secondary}
          </Button>
        </Stack>
      </Container>
    </>
  );
}

const initialState = {
  screen: 'login',
  device_type: '',
  name: '',
  phone_number: '',
  email: '',
  password: '',
  showPassword: false,
  loading: false,
  disabled: false,
  error: null,
  alert: null,
};

const FORM_ACTIONS = Object.freeze({
  INPUT: 'input',
  RESET: 'reset',
  TOGGLE_LOADING: 'toggleLoading',
  TOGGLE_SHOW_PASSWORD: 'toggleShowPassword',
  SWITCH_SCREEN: 'switchScreen',
  SWITCH_SIGNUP_LOGIN: 'switchSignupLogin',
  SET_ERROR: 'setError',
});

const reducer = (state, { type, payload }) => {
  switch (type) {
    case FORM_ACTIONS.INPUT:
      let [key, val] = payload;
      return { ...state, [key]: val, error: null };
    case FORM_ACTIONS.TOGGLE_SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword };
    case FORM_ACTIONS.SWITCH_SCREEN:
      return { ...initialState, screen: payload };
    case FORM_ACTIONS.SWITCH_SIGNUP_LOGIN:
      const isLogin = state.screen === 'login';
      let screen = isLogin ? 'signup' : 'login';
      return { ...initialState, screen };
    case FORM_ACTIONS.TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    case FORM_ACTIONS.RESET:
      return initialState;
    case FORM_ACTIONS.SET_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
};
