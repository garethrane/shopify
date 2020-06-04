if($(".cart-recap").length){

        // Elements
        var elSubTotal = $(".js-cart-shipping-subtotal");  
        var elShipping = $(".js-cart-shipping-rate");   
        var elVat = $(".js-cart-vat");
        var elCartTotal = $(".js-cart-total");

        // Values
        var subTotal = elSubTotal.text();
        subTotal = parseFloat(subTotal.replace("£",""));
        var calculatedShippingCost;
        var totalVAT;
        var cartTotalExVAT;
        var cartTotal;        

        // Get the current shipping rate
        $.ajax({  
            type:'post',
            async:false,
            url: "https://mammoth-roofing.myshopify.com/cart/shipping_rates.json?shipping_address%5Bzip%5D=SE1+3SY&shipping_address%5Bcountry%5D=United+Kingdom",
            dataType: 'json', 
            success: function(result){

                calculatedShippingCost = result["shipping_rates"][0]["price"];
                console.log("shipping is (custom.js - cart): " + calculatedShippingCost);
            
            },
            error : function(request,error){
            console.log("====== ERROR ======");
            }
        });  

        // Get values
        cartTotalExVAT = +subTotal + +calculatedShippingCost; // Cart total (ex Vat)
        cartTotal = ((cartTotalExVAT/100) * (vat+100)).toFixed(2); // Calc VAT
        totalVAT = cartTotal - cartTotalExVAT;

        // Test output
        console.log("Cart sub total is: " + subTotal);
        console.log("Cart Shipping is: " + calculatedShippingCost);
        console.log("Calculated cart total (EX VAT): " + cartTotalExVAT);
        console.log("Cost of VAT: " + totalVAT);
        console.log("Calculated cart total (INC VAT): " + cartTotal);

        // Set values
        elShipping.text(calculatedShippingCost);
        elVat.text(totalVAT);
        elCartTotal.text(cartTotal);        
     
    }
