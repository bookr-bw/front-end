import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Modal, ModalHeader} from 'reactstrap';
import Review from './Review';
import ReviewCard from './ReviewCard';
import {deleteBook, loadBook, getReviews} from '../actions';
import styled from 'styled-components';

const Button = styled.div`
    border-radius: 4px;
    color: white;
    width: 110px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &.red {
        background: red;
    }
    &.green {
        background: green;
    }
    &.red:hover {
        background:pink;
    }
    &.green:hover {
        background:lightgreen;
    }
}
`


const BookPage = props => {
  
    const id = Number(props.match.params.id);
    const {
        className,
        book,
        isLoading,
        loadBook,
        reviews,
        getReviews,
        needUpdate
    } = props;

    const [modal, setModal] = useState(false);
  
    const toggle = () => setModal(!modal);

    const removeBook = () => {
        props.deleteBook(props.book.id);
    }

    useEffect(() => {
        console.log(isLoading,reviews.length,needUpdate);
        if (!isLoading && (!book  || book.id !== id)) loadBook(id);
        if (!isLoading && (reviews.length===0 || needUpdate)) getReviews();
    },[book,isLoading,loadBook,id,reviews,getReviews,needUpdate])

  return (

    <div className='book-page'>
        {book 
            ? <div>
        
                <div className='card-head'>
                    <h2>{book.title}</h2>
                </div>
                <div className='card-body'>
                    <h3>{book.author}</h3>
                    <p>{book.description}</p>
                    <Button className='green' onClick={toggle}>Add Review</Button>
                    <Button className='red' onClick={removeBook}>Delete</Button>
                </div> 
            </div>
            : null
        }  
        <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>What did you think of this book?</ModalHeader>
            <Review book={book} toggle={toggle}/>
        </Modal>
        {book 
            ? reviews.filter(review=>review.books_id === book.id).map((review,index)=><ReviewCard key={index} review={review}/>)
            : null
        }
    </div>
  );
}
const mapStateToProps = state => {
  return {
    book: state.currentBook,
    isLoading: state.isLoading,
    reviews: state.reviews,
    needUpdate: state.needUpdate
  }
}
export default connect(mapStateToProps,{deleteBook, loadBook, getReviews})(BookPage);