import '@/index.css';
import './CatalogPage.css';
import {
  Container,
  Title,
  Text,
  Box,
  Button, Stack,
} from '@mantine/core';

export function CatalogPage() {
  return (
    <Container fluid className="page">

            <Box className="search-bar">
              <div className="search-input search-input--large">
                <label htmlFor="searchInput" className="visually-hidden">Search products</label>
                <div className="search-input__icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </div>
                <input
                  id="searchInput"
                  placeholder="Search for products"
                  className="search-input__field"
                  value=""
                  aria-label="Search products"
                />
              </div>
            </Box>

            <Box className="filters">
              <Stack className="filter-group">
                <label htmlFor="sortSelect" className="filter-group__label">Sort by</label>
                <select id="sortSelect" className="filter-group__select" aria-label="Sort products by">
                  <option value="one">Category</option>
                  <option value="two">Price</option>
                  <option value="three">Rating</option>
                </select>
              </Stack>
            </Box>

            <div className="filter-tags">
              <div className="filter-tag">Category</div>
              <div className="filter-tag">Price</div>
              <div className="filter-tag">Rating</div>
              <div className="filter-tag">Reset all</div>
            </div>

            <div className="product-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="product-card">
                  <div className={`product-card__image product-card__image--${item}`}></div>
                  <div className="product-card__info">
                    <div className="product-header">
                      <h3 className="product-card__title">Product Title {item}</h3>
                    </div>
                    <p className="product-card__description">
                      Product description {item}
                    </p>
                    <div className="product-pricing">
                      <p className="product-card__price">${100 + item * 20}</p>
                      {item % 2 === 0 && <p className="product-card__old-price">${120 + item * 20}</p>}
                    </div>
                    <Button className="product-card__button">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination">
              <a href="#" className="pagination__first">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.41 7.41L17 6l-6 6 6 6 1.41-1.41L13.83 12l4.58-4.59zM6 6h2v12H6V6z"/>
                </svg>
              </a>
              <a href="#" className="pagination__arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"/>
                </svg>
              </a>
              {[1, 2, 3, 4, 5].map((page) => (
                <a key={page} href="#" className={`pagination__page ${page === 1 ? 'pagination__page--active' : ''}`}>
                  {page}
                </a>
              ))}
              <a href="#" className="pagination__arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
                </svg>
              </a>
              <a href="#" className="pagination__last">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.59 7.41L7 6l6 6-6 6-1.41-1.41L10.17 12 5.59 7.41zM16 6h2v12h-2V6z"/>
                </svg>
              </a>
            </div>

    </Container>
  );
};
