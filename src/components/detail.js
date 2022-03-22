import axios from 'axios';
import React, {Component} from 'react';
import "./detail.scss";
import {Link} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

class Detail extends Component {
    constructor(props) {
        super();
        const tmp = props.location.pathname.split("/");
        var id= tmp[1];
        var total = props.location.total;
        var comic = props.location.comic;
        this.state = {
            id: id,
            comic: comic,
            total: total
        };
        this.update = this.update.bind(this);
    }
    
    update(event){
        event.persist(); 
        const tmp = window.location.pathname.split("/");
        const newid = tmp[1];
        let curTotal = this.state.total;
        var newComic = [];
        for (let i = 0; i < curTotal.length; i++) {
            if (curTotal[i].id == newid) {
                newComic = curTotal[i];
            }
        }
        this.setState({
            comic: newComic
        })
    }
    
    render() {
        let curComic = this.state.comic;
        let imagepath = curComic.image.path + "/portrait_fantastic." + curComic.image.extension;
        let prevLink = "/" + curComic.previd;
        let nextLink = "/" + curComic.nextid;
        console.log(curComic.format);
        console.log(curComic.description);
        console.log(curComic.title);
        if (curComic.format == null) {
            curComic.format = "N/A";
        }
        if (curComic.description == null) {
            curComic.description = "N/A";
        }
        if (curComic.price == null) {
            curComic.price = "N/A";
        }
        return(
            <div className="detailbody">
                <div className="buttons">
                    <Link className="left" to={prevLink} onClick={this.update}>Previous</Link>
                    <Link className="right" to={nextLink} onClick={this.update}>Next</Link>

                </div>
                <div className="content">
                    <img src={imagepath}/>
                    <div className="comicdetails">
                        <h3>{curComic.title}</h3>
                        <p className="format">Format:    {curComic.format}</p>
                        <p className="price">Price:    {curComic.price}</p>
                        <p className="p1">Description:</p> 
                        <p className="p2">{curComic.description}</p>
                    </div>
                </div>
            </div>             
        );
    }
    
}


export default Detail;