import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  InputLeftElement,
  Text,
  InputGroup,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

const center = { lat: 19.0760, lng: 72.8777 }

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' boxShadow='xl' left={900} top={170} h='60%' w='40%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>

      <HStack spacing={2} justifyContent='space-between'>
        <span className='origin-txt'>Origin</span>
        <Box className="origin" bg='white'>
          <Autocomplete>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
                children='🟢'
              />
              <Input type='text' placeholder='Origin' ref={originRef} size='lg' />
            </InputGroup>
          </Autocomplete>
        </Box>
        <span className='destination-txt'>Destination</span>
        <Box className="destination" bg='white'>
          <Autocomplete>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
                children='📍'
              />
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
                size='lg'
              />
            </InputGroup>

          </Autocomplete>
        </Box>

        <ButtonGroup>
          <Button borderRadius='xxl' height={20} colorScheme={'facebook'} className='btn' type='submit' onClick={calculateRoute}>
            Calculate
          </Button>
          <IconButton
            className='clear-btn'
            aria-label='center back'
            icon={<FaTimes />}
            onClick={clearRoute}
          />
        </ButtonGroup>
      </HStack>

      <Box className='distance-card' boxShadow='xs' maxW='xl' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Text><span className='distance-txt'>Distance</span>     <span className='dist-km'>{distance}</span> </Text>
        <Box className='lower-box' maxW='xl' borderWidth='1px' overflow='hidden'>

        </Box>
      </Box>


      <IconButton
        aria-label='center back'
        className='center-btn'
        icon={<FaLocationArrow />}
        isRound
        onClick={() => {
          map.panTo(center)
          map.setZoom(15)
        }}
      />
    </Flex>
  )
}

export default Map