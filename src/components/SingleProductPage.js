import React, { Component }  from 'react';
import { NavLink } from "react-router-dom";
import  Rating  from "react-rating";
import C from '../store/constants'
import {connect } from 'react-redux'
import {fetchProductById} from '../store/actions'
import  SiteHeader  from "./SiteHeader";
import fullStar from '../img/fullStar.png'
import halfStar from '../img/halfStar.png'
import emptyStar from '../img/emptyStar.png'
import minusB from '../img/minus-b.png'
import minusG from '../img/minus-g.png'
import addB from '../img/add-b.png'
import addG from '../img/add-g.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faHeart,faCommentDots } from '@fortawesome/free-solid-svg-icons'

const PRODUCT_IMG_URL = "http://gwf-demo.usask.ca/DummyServer/images/products/"

const mapStateToProps = (state,props) =>{
    console.log(state)
    let productId = parseInt(props.match.params.productId)
    return {
        product : state.products.filter(product => {
            return product.id == productId
        })
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return{
        fetchProductById(productId){
            dispatch(fetchProductById(productId))
        }
    }
  }

class SingleProductPage extends Component{


    render(){

        if(this.props.product.length == 0){
            let productId = this.props.match.params.productId;
            this.props.fetchProductById(productId);
            return(
                <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" />
            )
        }
        let product = this.props.product[0];
        let priceWas = parseFloat(product.priceWas);
        let priceIs = parseFloat(product.priceIs);

        if(priceWas < priceIs){
            let tempPrice = priceIs;
            priceIs = priceWas;
            priceWas = tempPrice;
        }



        //TODO remove when we have real product specifications
        product.specifications = [
            "Lorem ipsum dolor sit amet, consectetur ",
            "Adipiscing elit, sed do eiusmod tempor incididunt ",
            "Ut labore et dolore magna aliqua",
            "Exercitation ullamco laboris nisi ut aliquip ex ea ",
            "Duis aute irure dolor in reprehenderit in "
        ];
        let productSpecificationsJsx = product.specifications.map((specification,index) => {
            return(
                <li key={`productSpecifications${index}`}>{specification}</li>
            )
        });

        let shippingOptions = [
            parseInt(((priceIs * 11)/100)),
            parseInt(((priceIs * 14)/100)),
            parseInt(((priceIs * 19)/100))
        ];

        let shippingOptionsJsx =[
            <ul key="shippingOptionsJsx">
                <li key="shippingOption1" >${shippingOptions[0]} -- Regular: within 10-15 days delivery</li>
                <li key="shippingOption2" >${shippingOptions[1]} -- Fast: within 5-7 days delivery</li>
                <li key="shippingOption3" >${shippingOptions[2]} -- Express: 2-day delivery </li>
            </ul>
        ];
        let returnPolicyJsx = <p>You can return a product for up to 30 days from the date you purchased it.
                                Any product you return must be in the same condition you received it and in the original
                                packaging. Please keep the receipt.</p>
        product.desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Erat nam at lectus urna duis convallis.
                        Augue mauris augue neque gravida in fermentum et sollicitudin. In tellus integer 
                        feugiat scelerisque varius morbi. Nisl condimentum id venenatis a condimentum vitae
                        sapien. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras.
                        Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Nam at lectus urna
                        duis convallis convallis tellus. Curabitur vitae nunc sed velit. Dui vivamus arcu felis 
                        bibendum ut tristique et egestas. Et ligula ullamcorper malesuada proin libero nunc consequat
                        interdum. Facilisi cras fermentum odio eu feugiat. Fringilla phasellus faucibus scelerisque
                        eleifend donec pretium. Leo a diam sollicitudin tempor id eu nisl nunc mi. Id faucibus nisl
                        tincidunt eget nullam. Odio morbi quis commodo odio aenean sed adipiscing diam donec.`;
        let reviewsJsx = product.comments.map((review,index)=>{

            return(
                <li  key={`review${index}`}   className="list-group-item" >
                    {review}
                </li>
            )
        });

        let ratingVal =  (Math.random() * (5 - 3.5) + 3.5).toFixed(1);

        return(
            <div className="singleProductPage">
            <SiteHeader />

            <div className=" headerMargin row container-fluid">
                <ProductPageSlider product={product}  />
                <div className="col-sm-12 col-md-6">
                    <h1 className="productTitle" >
                        {product.productTitle}  
                    </h1>
                    <div className="price">
                        <small><strike className="text-muted">{priceWas}</strike></small> {priceIs}
                    </div>
                    <Rating 
                        readonly
                        initialRating={ratingVal}
                        emptySymbol={<img src={emptyStar} className="icon" />}
                        fullSymbol={<img src={ fullStar} className="icon" />}
                    /> <small> ({ratingVal} / 5 ) X {product.numberOfRates}</small>

                    <ul id="singleProductPageTab1" className="nav nav-tabs my-2">
                        <li key="tabBtn1" className="active"><a data-toggle="tab" href="#specifications">Specifications</a></li>
                        <li key="tabBtn2" >|<a data-toggle="tab" href="#shippingOptions">Shipping Options</a></li>
                        <li key="tabBtn3" >|<a data-toggle="tab" href="#returnPolicy">return Policy</a></li>
                    </ul>
                    <div className="tab-content ">
                        <div key="specifications" id="specifications"  className="tab-pane fadeIn active">
                            <ul>
                                {productSpecificationsJsx}
                            </ul>
                        </div>
                        <div key="shippingOptions" id="shippingOptions" className="tab-pane fade">
                            {shippingOptionsJsx}

                        </div>
                        <div key="returnPolicy" id="returnPolicy"  className="tab-pane fade">
                            {returnPolicyJsx}
                        </div>
                    </div>


                    <div id="addToCartModule" className="container">
                        <ChangeNumberOfProductsInCart numberOfItem={1} />

                        <a className="addToCartComponent float-left rounded-pill align-middle bg-success text-white px-3 py-2" >
                            <FontAwesomeIcon icon={faPlus} className="text-white" /> Add to Cart
                        </a>
                        <a className="CartFavItem float-left mx-2 rounded-circle align-middle " >
                            <FontAwesomeIcon icon={faHeart} className="text-secondary" />
                        </a>
                    </div>


                </div>
                <div className="container-fluid">
                    <ul id="singleProductPageTab2" className="nav nav-tabs">
                        <li key="tabBtn1" className="active"><a data-toggle="tab" href="#description">Description</a></li>
                        <li key="tabBtn2" >|<a data-toggle="tab" href="#reviews">Reviews <small>({product.comments.length})</small></a></li>
                    </ul>
                    <div className="tab-content my-2 ">
                        <div key="description" id="description"  className="tab-pane fadeIn active">
                            <p className="px-3">
                                {product.desc}
                            </p>
                        </div>
                        <div key="reviews" id="reviews"  className="tab-pane fade">
                            <ul className="list-group list-group-flush">{reviewsJsx}</ul>
                        </div>
                    </div>
                </div>
            </div>
            
            </div>
        )
    }
}


function ChangeNumberOfProductsInCart(props) {
    console.log(props)
    return (
        <div className="changeNumberOfItemsInCart float-left rounded-pill align-middle mr-3 pt-1" >
            <center>
                <button className="pl-2 align-middle"><img src={minusB} /></button>
                <b className="px-2 ">01</b>
                <button className="pr-2"><img src={addB} /></button>
            </center>
        </div>
    )
}
function ProductPageSlider({product}) {
    let productThumbsJsx = product.images.map((image,index) =>{
        let active = (index == 0)? " active " : "";
        return (
                <li key={`productThumb${index}`} className={`float-left ${active}`} >
                    <a data-toggle="tab" href={`#thumb${index}`} >
                        <img className="img-thumbnail ImgScaleDown img-fluid " src={PRODUCT_IMG_URL+image} alt={product.productTitle} />
                    </a>
                </li>
            )
    });
    let productImagesJsx = product.images.map((image,index) =>{
        let active = (index == 0)? " active " : "";
        return (
                <div key={`productImg${index}`} id={`thumb${index}`}  className={`tab-pane fadeIn ${active}`} >
                    <img className="img-fluid"  src={PRODUCT_IMG_URL+image} alt={product.productTitle}  />
                </div>
            )
    });
    
    return (
        <div id="productPageSlider" className=" col-sm-12 col-md-6 align-middle">
            <div className="row container-fluid">
                <div className="col-sm-12 col-md-2">
                    <ul id="productsThumCarousel" className="nav nav-tabs my-2 float-left">
                        {productThumbsJsx}
                    </ul>
                </div>
                <div className="col-sm-12 col-md-10" >
                    <div className="tab-content float-left">
                        {productImagesJsx}
                    </div>
                </div>
            </div>
        </div>
    ) 
}



export default connect(mapStateToProps,mapDispatchToProps)(SingleProductPage);