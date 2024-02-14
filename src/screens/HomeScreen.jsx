import { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import AboutUs from '../components/AboutUs';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../slices/productsApiSlice';
import { fetchProductsBySearch } from '../slices/productsApiSlice';
const HomeScreen = () =>
{
  const { keyword } = useParams();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [renderCount, setRenderCount] = useState(7)


  const products = useSelector((state) =>
  {
    return state.product.products.products
  })

  const searchKeyword = useSelector((state) =>
  {
    return state.product;
  })

  console.log(searchKeyword, "keyword>>>>>>>")

  const searchProductHandler = (e) =>
  {
    let debounceTimer;

    // Set a new timer to dispatch the action after a delay (e.g., 300 milliseconds)
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() =>
    {
      dispatch(fetchProductsBySearch(e.target.value));
    }, 500);
  }

  const isLoading = false;
  const error = false;

  useEffect(() =>
  {
    dispatch(fetchProducts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleScroll = () =>
  {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 220
    ) {
      // Fetch more products when scroll is almost at the bottom
      console.log("hi")
      setLoading(true)
      setTimeout(() =>
      {
        setRenderCount((prevRenderCount) => prevRenderCount + 4);
        setLoading(false)
      }, 1500)

    }
  }

  useEffect(() =>
  {
    window.addEventListener('scroll', handleScroll);

    return () =>
    {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [products, renderCount]);




  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />

      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <AboutUs />
          <h1 style={{ textAlign: "center" }}>All Products</h1>
          <div className="custom-container child-center">

            <input type="text"
              className="search-products"
              placeholder="Search..."
              onChange={searchProductHandler}
            />

          </div>
          <div className="custom-container">
            <Row>
              {products && products.length > 0 && products.slice(0, renderCount).map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>

          </div>

          <Paginate
            // pages={data.pages}
            // page={data.page}
            keyword={keyword ? keyword : ''}
          />

          {loading && <div className="show-loader">
            <Spinner animation="border" size="lg" ></Spinner>
          </div>}
        </>
      )}
    </>
  );
};

export default HomeScreen;
