import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../Header";
import BookCard from "../BookCard";
import {ProgressBar} from 'react-loader-spinner'
import './index.css'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

class Home extends Component {
  state = {
    newBooks: [],
    apiStatus: apiStatusConstants.inProgress,
  };

  componentDidMount() {
    this.getNewBooks();
  }
  onClickRetry=()=>{
    this.getNewBooks();
  }

  getNewBooks = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const apiUrl = 'https://api.itbook.store/1.0/new';
    const response = await fetch(apiUrl);

    if (response.ok) {
      const fetchedData = await response.json();
      console.log(fetchedData)
    //   image, price, title, id
      const updatedfetchedData=fetchedData.books.map(eachbook=>({
        image:eachbook.image,
        price:eachbook.price,
        id:eachbook.isbn13,
        title:eachbook.title

    }))
      this.setState({
        newBooks:updatedfetchedData,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      console.log("error");
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  renderSuccess = () => {
    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      slidesToScroll: 2,
      slidesToShow: 3,
   
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 786,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const { newBooks } = this.state;

    return (
      
       
        <div>
            <div className="new-books-container">
          <h1 className="Welcome-heading">Welcome to our Books App</h1>
          <p className="Home-paragraph">
            At our book emporium, immerse yourself in a world of boundless tales, knowledge, and literary escapades. Discover curated collections, explore hidden gems, and indulge in the magic of storytelling. Whether you seek adventures between pages or wisdom within chapters, our shelves hold treasures waiting to be explored. Join us on this enchanting journey through the realms of literature.
          </p>
          </div>
         
            
          <ul className="Carousel ">
            <h1 className="car-heading"> New Books</h1>
            <Slider {...settings}>
              {newBooks.map((eachbook) => (
                <BookCard bookdetails={eachbook} key={eachbook.id} />
              ))}
            </Slider>
          </ul>
          </div>
     
      
    );
  };
  renderLoader = () => {
    return (
      <div className="loader-container">
        <ProgressBar className="progress-bar" type="ProgressBar" color="#0284C7" height={50} width={50} />
      </div>
    );
  };
  
  renderFailure = () => {
    return (
      <div className="Failure-container">
        <img src="https://res.cloudinary.com/dgviahrbs/image/upload/v1694944653/Group_7522_ljmtgo.jpg" alt="failure" className="failure-image" />
        <button type="button" onClick={this.onClickRetry} className="retry-button">
          Try Again
        </button>
      </div>
    );
  };
  renderViews = () => {
    const { apiStatus } = this.state; // Corrected the variable name here
  
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader();
      case apiStatusConstants.success:
        return this.renderSuccess(); // Updated function name from renderSuccessView to renderSuccess
      case apiStatusConstants.failure:
        return this.renderFailure();
      default:
        return null;
    }
  };
  


  render() {
    return(
    <div>
    <Header />

     {this.renderViews()}
     </div>
    )
  }
}

export default Home;
