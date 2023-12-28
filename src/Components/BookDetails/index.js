import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import './index.css';
import { ProgressBar } from 'react-loader-spinner';
import { FaStar } from 'react-icons/fa';
import  CartContext  from '../../Context/cartcontext';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  
  const cartContext = useContext(CartContext);

  const fetchBookDetails = async (bookId) => {
    setApiStatus(apiStatusConstants.inProgress);
    try {
      const response = await fetch(`https://api.itbook.store/1.0/books/${bookId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setBookDetails(data);
        setApiStatus(apiStatusConstants.success);
      } else {
        console.error('Failed to fetch book details');
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    fetchBookDetails(id);
  }, [id]);

  const renderStars = () => {
    const stars = [];
    const rating = parseFloat(bookDetails.rating || 0);

    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={i} />);
    }

    return stars;
  };

  const onClickAddToCart = () => {
    const itemToAdd = {
      id: bookDetails.isbn13,
      title: bookDetails.title,
      authorName: bookDetails.authors,
      coverPic: bookDetails.image,
      rating: bookDetails.rating,
      price:bookDetails.price,
      quantity:1,
    };

    cartContext.addCartItem(itemToAdd);
  };

  const retryFetch = () => {
    fetchBookDetails(id);
  };

  const renderLoader = () => {
    return (
      <div className="loader-container">
        <ProgressBar className="progress-bar" type="ProgressBar" color="#0284C7" height={50} width={50} />
      </div>
    );
  };

  const renderSuccess = () => {
    let numberOnly = bookDetails.price ? bookDetails.price.substring(1) : 0;
    const rupees = Math.round(parseInt(numberOnly) || 0);
    
    return (
      <div className="book-details">
        <img src={bookDetails.image} className="book-image" alt="book" />
        <div>
          <h1 className="book-title">{bookDetails.title}</h1>
          <h1 className="book-authors">{bookDetails.authors}</h1>
          <p className="book-description">{bookDetails.desc}</p>
          <p className="book-price">Price: Rs{rupees * 80}</p>
          <p className="book-rating">Rating: {renderStars()}</p>
          <p className="book-publisher">Publisher: {bookDetails.publisher}</p>
          
          {bookDetails.pdf && (
      <a href={bookDetails.pdfUrl} target="_blank" rel="noopener noreferrer">
        <button>Download PDF</button>
      </a>
    )}
          <button onClick={onClickAddToCart}>Add to Cart</button>
        </div>
      </div>
    );
  };

  const renderFailure = () => {
    return (
      <div className="Failure-container">
        <img
          src="https://res.cloudinary.com/dgviahrbs/image/upload/v1694944653/Group_7522_ljmtgo.jpg"
          alt="failure"
          className="failure-image"
        />
        <button type="button" onClick={retryFetch} className="retry-button">
          Try Again
        </button>
      </div>
    );
  };

  const renderViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoader();
      case apiStatusConstants.success:
        return renderSuccess();
      case apiStatusConstants.failure:
        return renderFailure();
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      {renderViews()}
    </div>
  );
};

export default BookDetails;
