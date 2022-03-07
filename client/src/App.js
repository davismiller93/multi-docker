import React from 'react';
import pic from './me.jpg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <br /><br />
          <img src ={pic} alt="pic" height={250} width={200} />
          <br /><br />
        </header>
        <div>
        <br /><br />
          <a
            className="App-link"
            href="https://www.facebook.com/zachary.godwin.9"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zachary Godwin
          </a>
        </div>
        <div>
          <a
            className="App-link"
            href="https://github.com/zngodwin"
            target="_blank"
            rel="noopener noreferrer"
          >
            Git Hub
          </a>
        </div>
        <div>
          <Link to="/otherpage">Other Page</Link>
        </div>
        <br /><br />
        <div>
          <Route exact path="/" component={Fib} />
          <Route path="/otherpage" component={OtherPage} />
        </div>
        <br /><br />
        
        <span>Email:&nbsp;<a href="mailto:zgodwin1@gmail.com">zgodwin1@gmail.com</a></span>
        <br /><br />

      </div>



      <div id="smart-button-container">
          <div style="text-align: center"><label for="description">Make Payment </label><input type="text" name="descriptionInput" id="description" maxlength="127" value=""></div>
            <p id="descriptionError" style="visibility: hidden; color:red; text-align: center;">Please enter a description</p>
          <div style="text-align: center"><label for="amount">$ </label><input name="amountInput" type="number" id="amount" value="" ><span> USD</span></div>
            <p id="priceLabelError" style="visibility: hidden; color:red; text-align: center;">Please enter a price</p>
          <div id="invoiceidDiv" style="text-align: center; display: none;"><label for="invoiceid">Account ID </label><input name="invoiceid" maxlength="127" type="text" id="invoiceid" value="" ></div>
            <p id="invoiceidError" style="visibility: hidden; color:red; text-align: center;">Please enter an Invoice ID</p>
          <div style="text-align: center; margin-top: 0.625rem;" id="paypal-button-container"></div>
        </div>
        <script src="https://www.paypal.com/sdk/js?client-id=sb&enable-funding=venmo&currency=USD" data-sdk-integration-source="button-factory"></script>
        <script>
        function initPayPalButton() {
          var description = document.querySelector('#smart-button-container #description');
          var amount = document.querySelector('#smart-button-container #amount');
          var descriptionError = document.querySelector('#smart-button-container #descriptionError');
          var priceError = document.querySelector('#smart-button-container #priceLabelError');
          var invoiceid = document.querySelector('#smart-button-container #invoiceid');
          var invoiceidError = document.querySelector('#smart-button-container #invoiceidError');
          var invoiceidDiv = document.querySelector('#smart-button-container #invoiceidDiv');
      
          var elArr = [description, amount];
            
          if (invoiceidDiv.firstChild.innerHTML.length > 1) {
            invoiceidDiv.style.display = "block";
          }
      
          var purchase_units = [];
          purchase_units[0] = {};
          purchase_units[0].amount = {};
      
          function validate(event) {
            return event.value.length > 0;
          }

          paypal.Buttons({
            style: {
              color: 'black',
              shape: 'rect',
              label: 'paypal',
              layout: 'horizontal',
        
            },

            onInit: function (data, actions) {
              actions.disable();

              if(invoiceidDiv.style.display === "block") {
                elArr.push(invoiceid);
              }

              elArr.forEach(function (item) {
                item.addEventListener('keyup', function (event) {
                  var result = elArr.every(validate);
                  if (result) {
                    actions.enable();
                  } else {
                    actions.disable();
                  }
                });
              });
            },

            onClick: function () {
              if (description.value.length < 1) {
                descriptionError.style.visibility = "visible";
              } else {
                descriptionError.style.visibility = "hidden";
              }

              if (amount.value.length < 1) {
                priceError.style.visibility = "visible";
              } else {
                priceError.style.visibility = "hidden";
              }
      
              if (invoiceid.value.length < 1 && invoiceidDiv.style.display === "block") {
                invoiceidError.style.visibility = "visible";
              } else {
                invoiceidError.style.visibility = "hidden";
              }

              purchase_units[0].description = description.value;
              purchase_units[0].amount.value = amount.value;

              if(invoiceid.value !== '') {
                purchase_units[0].invoice_id = invoiceid.value;
              }
            },

            createOrder: function (data, actions) {
              return actions.order.create({
                purchase_units: purchase_units,
              });
            },
      
            onApprove: function (data, actions) {
              return actions.order.capture().then(function (orderData) {

                // Full available details
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

                // Show a success message within this page, e.g.
                const element = document.getElementById('paypal-button-container');
                element.innerHTML = '';
                element.innerHTML = '<h3>Thank you for your payment!</h3>';

                // Or go to another URL:  actions.redirect('thank_you.html');
                
              });
            },

            onError: function (err) {
              console.log(err);
            }
          }).render('#paypal-button-container');
        }
        initPayPalButton();
        </script>
    </Router>
  );
}

export default App;
