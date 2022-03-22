import React, {Component} from 'react';
import './gallery.scss';
import PropTypes from 'prop-types';
import GalleryCard from './gallaryCard';
import Select from 'react-select';

const axios = require('axios');
const apiurl = "https://gateway.marvel.com:443/v1/public/comics?apikey=833cd1b1890fb1fa253e42b0bd21dffe";


class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterby: "all",
            comics: []
        };
        axios.get(apiurl).then(
            (response) => {
                const result = []
                const items = response.data.data.results;
                items.forEach(
                    (element)=> {
                        result.push({
                            id: element.id,
                            title: element.title,
                            image: element.thumbnail,
                            format: element.format,
                            description: element.description,
                            previd: 0,
                            nextid: 0
                        })
                    }
                )
                this.setState({
                    comics: result
                });
            }
        );
        this.onChange =  this.onChange.bind(this);
    }

    onChange(event) {
        const curFilter = event.target.value;

        axios.get(apiurl).then(
            (response) => {
                const curResult = [];
                const items = response.data.data.results;
                items.forEach(
                    (element)=> {
                        if (curFilter == "all" || element.format == curFilter) {
                            curResult.push({
                                id: element.id,
                                title: element.title,
                                image: element.thumbnail,
                                format: element.format,
                                description: element.description,
                                previd: 0,
                                nextid: 0
                            })
                        }
                    }
                )
                this.setState({
                    comics: curResult,
                    filterby: curFilter
                });
            }
        );
    }

    render() {
        var comics = this.state.comics;
        for (let i = 0; i < comics.length; i++) {
            if (i == 0 && comics.length == 1) {
                comics[i].previd = comics[i].id;
                comics[i].nextid = comics[i].id;
            } else if (i == 0) {
                comics[i].previd = comics[comics.length-1].id;
                comics[i].nextid = comics[i+1].id;
            } else if (i == comics.length - 1) {
                comics[i].previd = comics[i-1].id;
                comics[i].nextid = comics[0].id;
            } else {
                comics[i].previd = comics[i-1].id;
                comics[i].nextid = comics[i+1].id;
            }
        }
        var cards = [];
        cards = this.state.comics.map((item)=> <GalleryCard comic={item} total={this.state.comics}/>)
        
        const filters = [
            {value: "all", label: "All"},
            {value: "Comic", label: "Comic"},
            {value: "Digest", label: "Digest"},
            {value: "Trade Paperback", label: "Trade Paperback"}
        ];

        return (
            <div className="gallerybody">
                <div className="filters">
                    <h2> Select Comic Format</h2>
                    <select onChange={this.onChange}>
                        <option value="all">All</option>
                        <option value="Comic">Comic</option>
                        <option value="Digest">Digest</option>
                        <option value="Trade Paperback">Trade Paperback</option>
                    </select>
                </div>
                <div className="cards">
                    <div className="cardholder">
                        {cards}
                    </div>
                </div>
            </div>
        );
        

    }
}


export default Gallery;