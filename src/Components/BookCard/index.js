import { Link } from 'react-router-dom';
import "./index.css";

const BookCard = (props) => {
    const { bookdetails } = props;
    const { image, price, title, id } = bookdetails;
    let numberOnly = price.substring(1); 
    const rupees = Math.round(parseInt(numberOnly)); 
    return (
        <Link to={`/bookdetails/${id}`} className="Link">
            <li className='New-Book-Card'>
                <img className='newbookimage' src={image} alt="cover pic" />
                <h1 className='newBookTitle'>{title}</h1>
                <p className='newBookPrice'>Price:₹{rupees*80}</p>
            </li>
        </Link>
    );
};

export default BookCard;
