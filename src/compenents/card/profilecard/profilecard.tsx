import { useState, useEffect } from 'react';
import { Card, Text, CardBody, Image, Heading, Flex, Icon, Button, Link, keyframes } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, EmailIcon } from '@chakra-ui/icons';
import { FaGithub } from 'react-icons/fa';

const jump = keyframes`
  0% { transform: translateY(0); }
  30% { transform: translateY(-20px); }
  70% { transform: translateY(10px); }
  100% { transform: translateY(0); }
`;

const bounce = keyframes`
  0% { transform: translateY(0); }
  30% { transform: translateY(-5px); }
  70% { transform: translateY(5px); }
  100% { transform: translateY(0); }
`;

const ProfileCard = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setTriggerAnimation(true);
  };

  useEffect(() => {
    setTriggerAnimation(true);
  }, []);

  const handleAnimationEnd = () => {
    setTriggerAnimation(false);
  };

  return (
    <>
      <Card 
        position="fixed" 
        bottom={0} 
        left={isVisible ? '0px' : '-400px'}  
        transition="left 0.3s ease" 
        width="auto"   
        borderWidth="1px" 
        borderRadius="lg" 
        overflow="hidden" 
        boxShadow="lg" 
        p={0.1}
        m={1}
        onMouseEnter={() => setTriggerAnimation(true)}
      >
        <CardBody>
          <Flex alignItems="center">
            <Image 
              src="/images/dragonpng.jpg"
              alt="Demolder Thomas"
              borderRadius="full"
              boxSize="100px"
              mr={4}
              animation={triggerAnimation ? `${jump} 0.5s ease forwards` : ''}
              onAnimationEnd={handleAnimationEnd}
            />
            <Flex flexDirection="column">
              <Heading size="md">Demolder Thomas</Heading>
              <Flex alignItems="center" mt={2}>
                <EmailIcon mr={2} />
                <Text>thomasdemolder@icloud.com</Text>
              </Flex>
              <Link href="https://github.com/ThomasDemolder" isExternal mt={4}>
                <Button
                  leftIcon={<Icon as={FaGithub} />}
                  colorScheme="blue"
                  variant="solid"
                  animation={triggerAnimation ? `${bounce} 0.5s ease forwards` : ''}
                  onAnimationEnd={handleAnimationEnd}
                >
                  My GitHub
                </Button>
              </Link>
            </Flex>
          </Flex>
        </CardBody>
      </Card>

      <Button 
        position="fixed" 
        bottom={0}  
        left={isVisible ? '395px' : '0px'}  
        onClick={toggleVisibility} 
        size="xs"                  
        bg="transparent"    
        border="none"                                   
        p={0.1}
        _hover={{ bg: 'transparent' }}
        _focus={{ outline: 'none' }}                 
      >
        {isVisible ? <ChevronLeftIcon boxSize={4} /> : <ChevronRightIcon boxSize={4} />}
      </Button>
    </>
  );
};

export default ProfileCard;
