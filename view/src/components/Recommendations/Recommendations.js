import './Recommendations.css';
import { useRef, useEffect } from 'react';
import { useGlobalRecommendContext } from '../../recommendationContext';
import { useGlobalContext } from '../../context';
import React from 'react';
import Book from "../Results/Book";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";

//https://covers.openlibrary.org/b/id/240727-S.jpg

const Recommendations = (authors) => {
    const { books, loading, resultTitle, setSearchTerm } = useGlobalRecommendContext();
    console.log(authors.authors.split(',')[0]);
    setSearchTerm(authors.authors.split(',')[0]);
    const booksWithCovers = books.map((singleBook) => {
        return {
            ...singleBook,
            // removing /works/ to get only id
            id: (singleBook.id).replace("/works/", ""),
            cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
        }
    });

    if (loading) return <Loading />;

    return (
        <section className='booklist'>
            <div className='container'>
                <div className='section-title'>
                    <h2>{resultTitle}</h2>
                </div>
                <div className='booklist-content grid'>
                    {
                        booksWithCovers.slice(0, 30).map((item, index) => {
                            return (
                                <Book key={index} {...item} />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Recommendations