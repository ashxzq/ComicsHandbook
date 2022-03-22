import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function GalleryCard(props) {
    const detailLink = '/' + props.comic.id;
    const imglink = props.comic.image.path + "/portrait_fantastic." + props.comic.image.extension;
    return (
        <div className="GalleryCard">
            <Link to={{pathname: detailLink, comic: props.comic, total:props.total}}>
                <img src={imglink}></img>
            </Link>
        </div>
    );
}

GalleryCard.propTypes = {
    comic: PropTypes.object
};

export default GalleryCard;