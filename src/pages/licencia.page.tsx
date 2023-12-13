import { AspectRatio, Box, Container, Heading, Icon, Spinner } from '@chakra-ui/react';
import Header from '@component/components/Header';
import { licenciaIcon } from '@component/components/Icons';
import { useState } from 'react';

const Licencia = () => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <Header>
            <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9" textAlign={"center"}>

                <Box mb={8} mt={4} w={"100%"} display={"flex"} alignSelf={"center"}>
                    <Box w={"95%"} mx="auto">
                        <Heading textAlign={"left"}>
                            <Icon as={licenciaIcon} mr={4} color={"muni.celeste"} />
                            Licencia de Conducir
                        </Heading>
                    </Box>
                </Box>

                <Box mx="auto" maxW="90%" borderRadius="2xl" position="relative">
                    {isLoading && (
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="2xl"
                            bg="rgba(255, 255, 255, 0.8)" // Ajusta el fondo del spinner según tu diseño
                        >
                            <Spinner size="xl" color="blue.500" />
                        </Box>
                    )}
                    <AspectRatio ratio={{ base: 9 / 16, md: 16 / 9 }}>
                        <iframe
                            src="https://www.bahia.gob.ar/turnolicencia/cargaminn.php?DNI=22124826"
                            style={{ borderRadius: '20px' }}
                            onLoad={handleLoad}
                        />
                    </AspectRatio>
                </Box>
            </Container>
        </Header >
    );
};

export default Licencia;
