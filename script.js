/*Create a constructor for new Bun object, including package type,
  flavors, price, and amount properties. */
function Bun (packageType, flavors, moneyValue, totalAmount){
    this.packageType = packageType;
    this.flavors = flavors;
    this.moneyValue = moneyValue;
    this.totalAmount = totalAmount;
}

$(document).ready(function(){

/*Grab the cartArray from local storage, parse it, and
  store it in cartInfo variable*/
var cartInfo = JSON.parse(localStorage.getItem("cartArray"));
console.log(cartInfo);


/*If cartInfo has nothing in it, don't do anything. Otherwise,
  let currentCartNumber track the length of items in the array.
  Store the items as a number ticker on the nav bar.*/
if (cartInfo == null) {
}else {

    var currentCartNumber = cartInfo.length;
    $("#currentAmount").append(currentCartNumber);

/*Loop through all the elements in cartInfo array, dynamically
  adding a column to store all flavors. Add package, quantity,
  price, remove button as table data elements to the row.
*/
  for (let i = 0; i < cartInfo.length; i++){
    var row = $("<tr></tr>");
    var flavorCol = $("<td></td>");
    var packageColumn = $("<td></td>");
    var quantityColumn = $("<td></td>");
    var priceColumn = $("<td></td>");
    var buttonColumn = $("<td></td>");
    var button = $("<button>Remove</button>");

/*Add attributes to button and package Column. Include class
  for button so it can be styled in CSS*/
    $(button).attr('id', 'remove_button_' + i);
    $(packageColumn).attr('class', 'packageColumn');
    $(button).addClass("removeButton");


/*Add flavors to flavor column on Shopping Cart page,
  and add the flavor column to the row created Also
  add package type, quantity, price, column, and button
  information, before appending all data to the row*/
    for (let j = 0; j < cartInfo[i].flavors.length; j++) {
        $(flavorCol).append(cartInfo[i].flavors[j] + "<br><br>");}
        row.append(flavorCol);

        $(packageColumn).append(cartInfo[i].packageType);
        row.append(packageColumn);

        $(quantityColumn).append(cartInfo[i].totalAmount);
        row.append(quantityColumn);

        $(priceColumn).append(cartInfo[i].moneyValue);
        row.append(priceColumn);

        $(buttonColumn).append(button);
        row.append(buttonColumn);

        $("#shoptable").append(row);

/*When button function is clicked, remove index from cart Info.
  String together cartInfo and save as cartArray in local storage*/
    $(button).on('click', function(){
        cartInfo.splice(i, 1);
        localStorage.setItem("cartArray" , JSON.stringify(cartInfo));
        $(this).parent().parent().remove();
        location.reload();
     });
  }
}


/*Check to see if amount has been selected. If a selection has occurred,
  depending on what the selection is, dynamically change price and image
  on page. If half-dozen or dozen is selected, display the 2 additional flavors
  dropdown. If single is selected, hide the additional flavors dropdown. Keep
  additional flavors hidden prior to any selection.*/
    $("input[name='amount']").change(function(){

        /*Image taken from http://www.jacquelynclark.com/2016/10/20/apple-pecan-cinnamon-rolls-two-ways/*/
        if (this.value == "half-dozen") {
            $("#additional-flavors").show();
            $("#maple_apple_pecan").attr("src" , "img/halfdozen.jpg");
            $("#totalprice").html("$6.50");
            }
        /*Image taken from http://expert.coffee/Kofe_Bulochki_Koritsa/*/
        else if (this.value == "dozen") {
            $("#additional-flavors").show();
            $("#maple_apple_pecan").attr("src" , "img/dozen.jpg");
            $("#totalprice").html("$11.99");
        }

        /*Image taken from http://www.cafebritt.com/experience-britt/recipes/coffee-cinnamon-roll*/
        else{
            $("#additional-flavors").hide();
            $("#maple_apple_pecan").attr("src" , "img/singleroll.jpg");
            $("#totalprice").html("$1.25");
        }
    })
    $("#additional-flavors").hide();


/*When check-out button on product page is clicked, save package, flavors,
  price, and quantity information. Use the constructor to create a new object.
  Place object into an array and push into local storage, through JSON stringify.
*/
    $("#checkout-button").click(function(){
        var package = $('input[type=radio][name=amount]:checked').val();
        var flavors = ["Maple Apple Pecan", $("#flavor-select1").val(), $("#flavor-select2").val()];
        var price = $("#totalprice").html();
        var quantity = $("#numberOfQuantity").val();

        var currentBun = new Bun(package, flavors, price, quantity);
        var cart = JSON.parse(localStorage.getItem("cartArray")) || [];

        cart.push(currentBun);
        localStorage.setItem("cartArray" , JSON.stringify(cart));
    });
});




