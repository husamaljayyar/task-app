import React, { Component } from 'react'
import Button from '../../Components/Button/Button'
import './Styles.css'
import { data } from '../../data/data'
import ListItem from '../../Components/ListItem/ListItem'
import { v4 as uuidv4 } from 'uuid'; // unique id 
import axios from 'axios';



export class HoomScreen extends Component {
    constructor() {
        super()
    }
    state = {
        value: '',
        // list: data
        list: [],  // use api data

    }
    // target from code in inside componentDidMount get data
    // componentDidMount => one work after render 
    // componentDidMount => support async
    // await => get result
    // axios => library get data 
    async componentDidMount() {
        try {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/todos"
            );
            console.log(response);
            // setState => edite state
            this.setState({
                list: response.data
            });
        } catch (e) {
            console.log(e);
        }

    }     

/* 
    async componentDidMount() {
        try {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/todos"
            );
            console.log(response);
            this.setState({
                list: response.data
            });
        } catch (e) {
            console.log(e);
        }

    }
 */


    render() {
        return (
            <div className="inner-container">
                <h1 className="page-title">To Do List</h1>
                <section className="input-section">
                    <div className="input-span_eror">
                        <input
                            className="add-task-input"
                            type="text"
                            placeholder="Enter a new Task..."
                            id="text"
                            name="text"
                            onChange={(e) => {
                                this.setState({
                                    value: e.target.value
                                })
                                console.log(this.state.value)
                            }}
                            value={this.state.value}
                        />
                        {this.state.error ?
                            <span>
                                {this.state.error}
                            </span> : null}

                    </div>
                    <Button
                        text="Add"
                        handleClick={() => {
                            if (this.state.value) {// Do you Contains data in state
                                const newArr = [
                                    {
                                        text: this.state.value,
                                        id: uuidv4()
                                    },
                                    ...this.state.list
                                ]
                                console.log(newArr)
                                this.setState({
                                    list: newArr,
                                    value: '', // delete data in input text
                                    error: ''  // delete error
                                })
                            } else {
                                this.setState({
                                    error: "Please submit a task"
                                })
                            }
                            console.log("mu list", this.state.list)
                        }} />
                </section>

                <section className="items-section">
                    {this.state.list.length ? (  // length => use pass on list idex 
                        this.state.list.map(item => (
                            <ListItem
                               /*  text={item.text} */
                               text={item.title}
                                key={item.id}
                                handleDelete={() => {
                                    const filterItems = this.state.list.filter(
                                        (filterItems) => filterItems.id != item.id // true => return the item
                                    );
                                    this.setState({
                                        list: filterItems,
                                    });
                                }}
                            />
                        ))
                    ) : (
                        <span>loading...</span>
                    )}
                </section>
            </div>

        )
    }
}
