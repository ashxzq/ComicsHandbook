import React from 'react';
import {Link} from 'react-router-dom';
import './searchCard.scss';
import PropTypes from 'prop-types';
import Search from './search';

function DetailDisplay(props) {
    let curComic = props.comic;
    let imagepath = curComic.image.path + "/portrait_incredible." + curComic.image.extension;
    const prevLink = '/detail/' + this.state.comic.previd;
    const nextLink = '/detail/' + this.state.comic.nextid;
    var prevComic = [];
    var nextComic = [];
    let curTotal = props.total;
    for (let i = 0; i < curTotal.length; i++) {
        if (curTotal[i].id = this.state.comic.previd) {
            prevComic = curTotal[i];
        }
        if (curTotal[i].id = this.state.comic.nextid) {
            nextComic = curTotal[i];
        }
    }
    return(
        <div className="detailbody">
            <div className="buttons">
                <Link to={prevLink}>Previous</Link>
                <Link to={nextLink}>Next</Link>
            </div>
            <div className="content">
                <img src={imagepath}/>
                <div className="comicdetails">
                    <h3>{curComic.title}</h3>
                    <p>Format: {curComic.formatt}</p>
                    <p>Price: {curComic.price}</p>
                    <p>Description: {curComic.description}</p>
                </div>
                <p>{curComic.id}</p>
                <p>{curComic.title}</p>
                <p>{curComic.nextid}</p>
            </div>
        </div>             
    );
}

DetailDisplay.propTypes = {
    comic: PropTypes.object,
    total: PropTypes.object
};

export default DetailDisplay;