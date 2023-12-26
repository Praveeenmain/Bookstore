import { Component } from "react";
import Header from "../Header";
import BookCard from "../BookCard";
import './index.css'
import {BiSearch} from 'react-icons/bi'
import {ProgressBar} from 'react-loader-spinner'
const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  };
class Books extends Component{
     state={
        bookname:"Love",
        apiStatus: apiStatusConstants.initial,
        books:[]
     }
     componentDidMount(){
        this.getBooks()
    }
    onChangeSearch=(event)=>{
        this.setState({
            bookname:event.target.value
        })
    }
    onKey = event => {
        if (event.key.toLowerCase() === 'enter') {
          this.getBooks()
        }
    }
    onSearchBooks = () => {
        this.setState(
          prevState => ({search: prevState.searchInput}),
          this.getBooks,
        )
    }
    getBooks=async()=>{
        this.setState({
            apiStatus:apiStatusConstants.inProgress
        })

        const{bookname}=this.state
        const apiUrl=`https://api.itbook.store/1.0/search/${bookname}`
        const response=await fetch(apiUrl)
        if (response.ok){
            const fetchedData=await response.json()
            console.log(fetchedData)
            const updatedfetchedData=fetchedData.books.map(eachbook=>({
                image:eachbook.image,
                price:eachbook.price,
                id:eachbook.isbn13,
                title:eachbook.title
            }))
            this.setState({
                books:updatedfetchedData                  ,
                apiStatus:apiStatusConstants.success
            })
        }else{
            console.log("error")
            this.setState({
                apiStatus:apiStatusConstants.failure
            })
        }

    }
    renderSuccess = () => {
        const { books } = this.state;
        return (
            <div>
                <div className="search-input-container">
            <input className="search-input" type="search" onKeyDown={this.onKey} onChange={this.onChangeSearch} placeholder="search Books"/>
            <button className="search-button"  onClick={this.onSearchBooks}> <BiSearch/> </button>
            </div>
          <ul className="Books-container">
            {books.map((eachbook) => (
              <BookCard bookdetails={eachbook} key={eachbook.id} />
            ))}
          </ul>
          </div>
        );
    }
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
            <button type="button" onClick={this.getBooks} className="retry-button">
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
    render(){
        return(
            <div>
             <Header/>

             {this.renderViews()}
              
            </div>
        )
    }
}
export default Books