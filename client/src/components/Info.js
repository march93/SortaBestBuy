import React, { Component } from 'react';
import '../styles/Info.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Info extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            productInfo: {}
        }
    }

    componentDidMount() {
        axios.get('/api/getProductInfo', {
            params: {
              id: this.props.match.params.id
            }
          })
            .then((response) => {
                // Update with product info matching the ID
                this.setState({
                    loading: false,
                    productInfo: response.data
                });
                console.log(response.data);
            })
            .catch((error) => {
                // Toast Error
                toast.error("Cannot get product info.", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            });
    }

    render() {
        // Render nothing to the screen until componentDidMount is ready
        if (this.state.loading) {
            return null;
        }

        return (
            <div className="Info">
                {this.state.productInfo.length > 0 ?
                    <div>Yes</div>
                    :
                    <div className="NoInfo">
                        <span className="no-item">Product Info Unavailable</span>
                    </div>
                }
            </div>
        );
    }
}

export default Info;