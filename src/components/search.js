import React, {Component, useState} from 'react';
import './search.scss';
import PropTypes from 'prop-types';
import SearchCard  from './searchCard';

const axios = require('axios');
const apiurl = "https://gateway.marvel.com:443/v1/public/comics?apikey=833cd1b1890fb1fa253e42b0bd21dffe";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            comics: [],
            sortby: "title",
            orderby:"as"
        };

        axios.get(apiurl).then(
            (response) => {
                const result = []
                const items = response.data.data.results;
                items.forEach(
                    (element)=> {
                        result.push({
                            id: element.id,
                            image: element.thumbnail,
                            title: element.title,
                            format: element.format,
                            price: element.prices[0].price,
                            description: element.description,
                            previd: 0,
                            nextid: 0
                        })
                    }
                )

                var curSort = this.state.sortby;
                var curOrder = this.state.orderby;
                result.sort(
                    (a,b) => {
                        if (curSort == 'title') {
                            var ta = a.title.toLowerCase();
                            var tb = b.title.toLowerCase();
                            if (curOrder == 'as') {
                                if (ta < tb) {
                                    return -1;
                                } else {
                                    return 1;
                                }
                            } else {
                                if (ta < tb) {
                                    return 1;
                                } else {
                                    return -1;
                                }
                            }
                        } else {
                            if (curOrder == 'as') {
                                return a.price - b.price;
                            } else {
                                return b.price - a.price;
                            }
                        }
                    }
                )
        
                this.setState({
                    comics: result
                });
            }
        );
        this.onChange = this.onChange.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
        this.changeSort =  this.changeSort.bind(this);
    }

    onChange(event) {
        const input = event.target.value.toLowerCase();
        var curSort = this.state.sortby;
        var curOrder = this.state.orderby;
        console.log(curSort);
        axios.get(apiurl).then(
            (response) => {
                const curResult = [];
                const items = response.data.data.results;
                items.forEach(
                    (element)=> {
                        if (element.title.toLowerCase().includes(input)) {
                            curResult.push({
                                id: element.id,
                                image: element.thumbnail,
                                title: element.title,
                                format: element.format,
                                price: element.prices[0].price,
                                description: element.description,
                                previd: 0,
                                nextid: 0
                            })
                        }
                    }
                )

                curResult.sort(
                    (a,b) => {
                        if (curSort == 'title') {
                            var ta = a.title.toLowerCase();
                            var tb = b.title.toLowerCase();
                            if (curOrder == 'as') {
                                if (ta < tb) {
                                    return -1;
                                } else {
                                    return 1;
                                }
                            } else {
                                if (ta < tb) {
                                    return 1;
                                } else {
                                     return -1;
                                }
                            }
                        } else {
                            if (curOrder == 'as') {
                                return a.price - b.price;
                            } else {
                                return b.price - a.price;
                            }
                        }
                    }
                )

                this.setState({
                    comics: curResult,
                    input: input
                });
            }
        );
    }

    changeSort(event) {
        var curSort = event.target.value;
        var curOrder = this.state.orderby;
        var comics = this.state.comics;

        comics.sort(
            (a,b) => {
                if (curSort == 'title') {
                    var ta = a.title.toLowerCase();
                    var tb = b.title.toLowerCase();
                    if (curOrder == 'as') {
                        if (ta < tb) {
                            return -1;
                        } else {
                            return 1;
                        }
                    } else {
                        if (ta < tb) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                } else {
                    if (curOrder == 'as') {
                        return a.price - b.price;
                    } else {
                        return b.price - a.price;
                    }
                }
            }
        )

        this.setState({
            comics: comics,
            sortby: curSort
        });
        
    }

    changeOrder(event) {
        var curSort = this.state.sortby;
        var curOrder = event.target.value;
        var comics = this.state.comics;
        console.log(curSort);
        comics.sort(
            (a,b) => {
                if (curSort == 'title') {
                    var ta = a.title.toLowerCase();
                    var tb = b.title.toLowerCase();
                    if (curOrder == 'as') {
                        if (ta < tb) {
                            return -1;
                        } else {
                            return 1;
                        }
                    } else {
                        if (ta < tb) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                } else {
                    if (curOrder == 'as') {
                        return a.price - b.price;
                    } else {
                        return b.price - a.price;
                    }
                }
            }
        )

        this.setState({
            comics: comics,
            orderby: curOrder
        });
    }
    
    render() {
        var comics = this.state.comics;
        for (let i = 0; i < comics.length; i++) {
            if (i == 0) {
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
        cards = this.state.comics.map((item)=> <SearchCard comic={item} total={this.state.comics}/>)

        return (
            <div className="body">
                <div className="inputbox">
                    <input 
                        type="text" 
                        placeholder="Search for the comic..."
                        onChange = {this.onChange}
                        />
                    <div className="sortoptions">
                        <p> Sort By:</p>
                        <select onChange={this.changeSort}>  
                            <option value="title">Title</option>
                            <option value="price">Prices</option>
                        </select>
                        <p> Order:</p>
                        <select onChange={this.changeOrder}>
                            <option value="as">Ascending</option>
                            <option value="ds">Descending</option>
                        </select>
                    </div>
                </div>
                <div className="cards">
                    {cards}
                </div>
            </div>
        );
    }
}



export default Search;