import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import "./index.css";

const BookCard = (props) => {
    const { bookdetails } = props;
    const { image, price, title, id } = bookdetails;
    let numberOnly = price.substring(1); 
    const rupees = Math.round(parseInt(numberOnly)); 

    return (
        <Link to={`/books/${id}`} className="Link">
            <LazyLoad>
            <li className='New-Book-Card'>
                <img className='newbookimage' src={image} alt="cover pic" />
                <h1 className='newBookTitle'>{title}</h1>
                <p className='newBookPrice'>Price:₹{rupees*80}</p>
            </li>
            </LazyLoad>
        </Link>
    );
};

export default BookCard;
