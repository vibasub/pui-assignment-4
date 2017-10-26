    //Create a constructor with all the attributes (price, quantity, 3 flavors)
function bun (firstFlavor, secondFlavor, thirdFlavor, moneyValue, totalAmount){
    this.firstFlavor = firstFlavor;
    this.secondFlavor = secondFlavor;
    this.thirdFlavor = thirdFlavor;
    this.moneyValue = moneyValue;
    this.totalAmount = totalAmount;
}

$(document).ready(function(){

var cartInfo = JSON.parse(localStorage.getItem("cartArray"));
console.log(cartInfo);

//save cart items from CartInfo array

if (cartInfo == null){

} else {

  var cartItems = cartInfo.length;

  for (i = 0; i < cartItems; i++){
    var row = $("<tr></tr>");
    var flavorCol = $("<td></td>");
    $(flavorCol).append(cartInfo[i].firstFlavor + "<br><br>");
    $(flavorCol).append(cartInfo[i].secondFlavor + "<br><br>");
    $(flavorCol).append(cartInfo[i].thirdFlavor + "<br><br>");

    row.append(flavorCol);
    $("<td>"+cartInfo[i].totalAmount+"</td>").appendTo(row);
    $("<td>"+cartInfo[i].moneyValue+"</td>").appendTo(row);
    $("#shoptable").append(row);

  }
}



    $("input[name='amount']").change(function(){
        if (this.value == "half-dozen") {
            $("#additional-flavors").show();
            $("#maple_apple_pecan").attr("src" , "img/halfdozen.jpg");
            $("#totalprice").html("$6.50");
            }

        else if (this.value == "dozen") {
            $("#additional-flavors").show();
            $("#maple_apple_pecan").attr("src" , "img/dozen.jpg");
            $("#totalprice").html("$11.99");
        }

        else{
            $("#additional-flavors").hide();
            $("#maple_apple_pecan").attr("src" , "img/singleroll.jpg");
            $("#totalprice").html("$1.25");
        }
    })
    $("#additional-flavors").hide();

        $("#checkout-button").click(function(){
        var flavor0 = "Maple Apple Pecan";
        var flavor1 = $("#flavor-select1").val();
        var flavor2 = $("#flavor-select2").val();
        var price = $("#totalprice").html();
        var quantity = $('input[type=radio][name=amount]:checked').val();

        var currentBun = new bun(flavor0, flavor1, flavor2, price, quantity);

        var cart = JSON.parse(localStorage.getItem("cartArray")) || [];

        cart.push(currentBun);
        localStorage.setItem("cartArray" , JSON.stringify(cart));
        console.log(cartInfo);
    });

});




//localStorage.getItem

//This is one order in the cart. we need to be able to save more than one.

















