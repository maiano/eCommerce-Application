import { Carousel } from '@mantine/carousel';
import {
  Box,
  Text,
  Group,
  Image,
  Button,
  Table,
  Title,
  Container,
  Badge,
  Divider,
  Modal,
  CloseButton,
} from '@mantine/core';
import { useState, useRef, useEffect, RefObject } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { ROUTES } from '@/app/routes';
import { useProductById } from '@/features/product/useProductById';
import { useImageHandler } from '@/shared/hooks/useImageHandler.ts';
import { CenterLoader } from '@/shared/ui/CenterLoader';
import { notifyError } from '@/shared/utils/custom-notifications';
import type { ModalEmbla, Wine, WineAttribute } from '@/types/types.tsx';
import './ProductPage.css';

const TRANSITION_DURATION = 300;

export function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: wine,
    error,
    isLoading,
  } = useProductById(id) as {
    data: Wine | undefined;
    error: unknown;
    isLoading: boolean;
  };

  const navigate: NavigateFunction = useNavigate();

  const mainCarouselRef: RefObject<ModalEmbla | null> =
    useRef<ModalEmbla | null>(null);
  const modalCarouselRef: RefObject<ModalEmbla | null> =
    useRef<ModalEmbla | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { handleImageLoad } = useImageHandler();

  useEffect(() => {
    if (error) {
      notifyError(error, {
        message: 'Something went wrong. Please try again later.',
      });
    }
    if (modalOpened && modalCarouselRef.current) {
      let raf: number;
      const initCarousel: () => void = (): void => {
        modalCarouselRef.current?.reInit();
        modalCarouselRef.current?.scrollTo(currentImageIndex);
      };

      raf = requestAnimationFrame(initCarousel);

      return (): void => cancelAnimationFrame(raf);
    }
  }, [modalOpened, currentImageIndex, error]);

  if (isLoading) return <CenterLoader />;

  if (!wine) return null;

  const ratingAttribute: WineAttribute | undefined = wine.attributes.find(
    (attr: WineAttribute): boolean => attr.name === 'Rating',
  );
  const ratingValue: number = ratingAttribute
    ? parseFloat(ratingAttribute.value)
    : wine.rating;

  const handleThumbnailClick = (index: number): void => {
    setCurrentImageIndex(index);
    mainCarouselRef.current?.scrollTo(index);
    modalCarouselRef.current?.scrollTo(index);
  };

  const openModal = (index: number): void => {
    setCurrentImageIndex(index);
    setModalOpened(true);
  };

  return (
    <Container className="page" style={{ marginTop: 20 }}>
      <Box className="product-content">
        <Box className="image-section">
          <Carousel
            className="carousel"
            controlSize={40}
            controlsOffset="xxs"
            loop
            slideSize="100%"
            align="start"
            onSlideChange={(index: number): void => setCurrentImageIndex(index)}
            getEmblaApi={(embla: ModalEmbla): ModalEmbla =>
              (mainCarouselRef.current = embla)
            }
            classNames={{
              viewport: 'carousel-viewport',
              container: 'carousel-container',
              slide: 'carousel-slide',
            }}
          >
            {wine.image.map((img: string, index: number) => (
              <Carousel.Slide key={index}>
                <Image
                  src={img}
                  alt={`${wine.name} ${index + 1}`}
                  className="main-product-image"
                  onClick={(): void => openModal(index)}
                  onLoad={handleImageLoad}
                />
              </Carousel.Slide>
            ))}
          </Carousel>

          <Group justify="center" mt="md">
            {wine.image.map((_: string, index: number) => (
              <Box
                key={index}
                className={`thumbnail-item ${currentImageIndex === index ? 'active-thumbnail' : ''}`}
                onClick={(): void => handleThumbnailClick(index)}
              >
                <Image
                  src={wine.image[index]}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail-image"
                  onLoad={handleImageLoad}
                />
              </Box>
            ))}
          </Group>
        </Box>

        <Box className="details-section">
          <Title order={1} c="yellow.7" className="title">
            {wine.name}
          </Title>

          <Divider className="divider" />

          <Title className="subtitle" order={3} mb="md">
            Description:
          </Title>
          <Text mb="md" c="dimmed" className="description">
            {wine.description}
          </Text>

          <Divider className="divider" />

          <Title order={3} mb="md">
            Price:
          </Title>
          <Group className="price-content" mb="xl" align="center">
            {wine.discountedPrice ? (
              <>
                <Text fw={700} size="xl" c="yellow.7">
                  ${wine.discountedPrice}
                </Text>
                <Text fw={700} size="md" c="dimmed" td="line-through">
                  ${wine.price}
                </Text>
                <Badge color="red" size="lg">
                  Save ${(wine.price - wine.discountedPrice).toFixed(2)}
                </Badge>
              </>
            ) : (
              <Text fw={700} size="xl" className="price"  c="dark.2">
                ${wine.price}
              </Text>
            )}
          </Group>

          <Divider className="divider" />

          <Title className='subtitle' order={3} mb="md">
            Wine Details:
          </Title>
          <Table mb="xl" verticalSpacing="sm" withTableBorder withColumnBorders>
            <Table.Tbody>
              {wine.attributes
                .filter(
                  (attr: WineAttribute): boolean => attr.name !== 'rating',
                )
                .map((attr: WineAttribute, index: number) => (
                  <Table.Tr key={index}>
                    <Table.Th
                      className="attribute"
                      fw={700}
                      style={{ width: '30%' }}
                    >
                      {attr.name}:
                    </Table.Th>
                    <Table.Td ta="center" fw={700}>
                      {attr.value}
                    </Table.Td>
                  </Table.Tr>
                ))}

              <Table.Tr>
                <Table.Th className="attribute" fw={700}>
                  Rating:
                </Table.Th>
                <Table.Td>
                  <Group justify="center" gap={4} ml="xs">
                    <Text fw={500} c="yellow.7">
                      ★ {ratingValue}
                    </Text>
                    <Text c="dimmed" size="md">
                      /5
                    </Text>
                  </Group>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>

          <Group justify="center" wrap="nowrap">
            <Button className="button button--primary button--large" w="50%">
              Add to Cart
            </Button>
            <Button
              className="button button--secondary button--large"
              w="50%"
              onClick={(): void | Promise<void> => navigate(ROUTES.CATALOG)}
            >
              Continue Shopping
            </Button>
          </Group>
        </Box>
      </Box>

      <Modal
        opened={modalOpened}
        onClose={(): void => setModalOpened(false)}
        fullScreen
        padding={0}
        withCloseButton={false}
        transitionProps={{ duration: TRANSITION_DURATION }}
      >
        <CloseButton
          onClick={(): void => setModalOpened(false)}
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 100,
            backgroundColor: 'dark.7',
            color: 'primary.0',
          }}
          size="xl"
        />

        <Carousel
          className="modal-carousel"
          controlSize={50}
          initialSlide={currentImageIndex}
          withIndicators
          loop
          onSlideChange={(index: number): void => setCurrentImageIndex(index)}
          getEmblaApi={(embla: ModalEmbla): ModalEmbla =>
            (modalCarouselRef.current = embla)
          }
          style={{
            backgroundColor: '#131c24',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
          }}
          classNames={{
            viewport: 'modal-viewport',
            container: 'modal-container',
            slide: 'modal-slide',
          }}
        >
          {wine.image.map((img: string, index: number) => (
            <Carousel.Slide key={index}>
              <Image
                className="modal-image"
                src={img}
                alt={`${wine.name} ${index + 1}`}
                onLoad={handleImageLoad}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Modal>
    </Container>
  );
}
