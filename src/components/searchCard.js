import React from 'react';
import {Link} from 'react-router-dom';
import './searchCard.scss';
import PropTypes from 'prop-types';
import Search from './search';

function SearchCard(props) {
    const detailLink = '/' + props.comic.id;
    const imglink = props.comic.image.path + "/standard_large." + props.comic.image.extension;
    return (
        <div className="SearchCard">
            <Link to={{pathname: detailLink, comic: props.comic, total:props.total}}>
                <div className="image">
                    <img src={imglink}></img>
                </div>
                <div className="details">
                    <h3>{props.comic.title}</h3>
                    <p>Price: {props.comic.price}</p>
                </div>
            </Link>
        </div>
    );
}

SearchCard.propTypes = {
    comic: PropTypes.object
};

export default SearchCard;