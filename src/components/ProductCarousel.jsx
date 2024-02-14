import { Link } from 'react-router-dom';
import { Carousel, } from 'react-bootstrap';

const ProductCarousel = () =>
{
  // const { data: products, isLoading, error } = useGetTopProductsQuery();
  let products = [1, 2, 3, 4];

  return (

    < div className="image-slder" >
      <Carousel pause='hover' className='bg-primary mb-4'>
        {products.map((product, index) => (
          <Carousel.Item key={index}>
            <Link to={`/product/${index}`}>
              <img src={`/images/slide${product}.jpg`} alt="Slider" fluid />
              {/* <Carousel.Caption className='carousel-caption'>
                <h2 className='text-white text-right'>
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption> */}
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div >
  )
};

export default ProductCarousel;
