import React, { useRef } from 'react';
import { MDBBtn, MDBRow, MDBCol, MDBContainer } from 'mdbreact';
import { useGlobalState } from './../../context/GlobalContext';
import axios from 'axios';

const url = 'http://localhost:5000';
export default function CheckoutForm() {

    const globalState = useGlobalState();
    globalState.cartData && globalState.cartData.cartItems.map(value => {
        return (
            delete value.productImage,
            delete value.productDescription,
            delete value.productQuantity
        );
    });

    const name = useRef();
    const phone = useRef();
    const address = useRef();

    function checkout(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: url + "/checkout",
            data: {
                name: name.current.value,
                phoneNumber: phone.current.value,
                address: address.current.value,
                orders: globalState.cartData.cartItems,
                totalPrice: globalState.cartData.totalPrice,
            },
            withCredentials: true
        }).then((response) => {
            if (response.data.status === 200) {
                alert(response.data.message)
            }
            else {
                alert(response.data.message);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <form className="singupCenter" onSubmit={checkout}>
                        <p className="h4 text-center mb-4">Checkout Form</p>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                            Your Name
                        </label>
                        <input type="text" ref={name} className="form-control" required />
                        <br />
                        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                            Phone
                        </label>
                        <input type="text" ref={phone} className="form-control" required />
                        <br />
                        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                            Address
                        </label>
                        <input type="text" ref={address} className="form-control" required />
                        <br />
                        <div className="text-center mt-4">
                            <MDBBtn color="indigo" type="submit">Confirm Order</MDBBtn>
                        </div>
                        <br />
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}