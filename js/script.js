//Your JavaScript code here


(function($) {
  ////var httpRequest;

  //click handler for the button
  document.getElementById("ajaxButton").onclick = function() {
    //get values from the input fields
    var apiKey = document.getElementById("apiKey").value;
    
    if(!apiKey){
      alert("missing api key!!");
    } else{
       makeRequest('http://api.nal.usda.gov/ndb/nutrients/?format=json&api_key='+ apiKey+ '&nutrients=205&nutrients=204&nutrients=208&nutrients=269');
    }
   };


  function makeRequest(url) {
    ////httpRequest = new XMLHttpRequest();

    // if (!httpRequest) {
    //   alert('Giving up :( Cannot create an XMLHTTP instance');
    //   return false;
    // }

    //Set text to loading... before request is made
    document.getElementById("nutritionData").innerHTML="<p>loading...</p>";
    // //where change
    // httpRequest.onreadystatechange = displayHTML;
    // //make ajax request
    // httpRequest.open('GET', url);
    // httpRequest.send();

     //JQuery get JSON request. If you want to set headers, you must use the full ajax function via http://api.jquery.com/jquery.ajax/
    $.getJSON(url, function(data) {
        //JQuery parses the JSON string using JSON.parse for you.
      console.log(data);
      displayHTML(data);
    });
  }

  //handler when response data is received
  function displayHTML(nutritionObject) {
    // if (httpRequest.readyState === XMLHttpRequest.DONE) {
    //   //code is 200, nothing is wrong
    //   if (httpRequest.status === 200) {
    //       //Clear previous
    //       document.getElementById("nutritionData").innerHTML="";
    //       //JSON.parse converts a JSON string to a JavaScript object
    //       var nutritionObject = JSON.parse(httpRequest.responseText);
    //       var nutritionDescription = nutritionObject.FOOD_DESC;
    //       nutritionDescription.forEach(function(currentBusiness){
    //         document.getElementById("nutritionData").innerHTML+="<p>"+currentBusiness.NDB_No+" "+currentBusiness.ComName +" "+currentBusiness.Shrt_Desc +"</p><hr>"
    //       });
    //   } else {
    //     alert('There was a problem with the request.');
    //   }
    // }
      //Clear previous
    document.getElementById("nutritionData").innerHTML = "<th> ID </th> <th> Name </th> <th> Nutrients </th>";
     var nutritionDescription = nutritionObject.report.foods;
     var thenutrition = nutritionObject.report.foods.nutrients;
     //var nutritionDescription = report.foods;
     nutritionDescription.forEach(function(currentNutritionObject){
      //console.log("%O", currentNutritionObject);
            var nO = currentNutritionObject.nutrients;
             document.getElementById("nutritionData").innerHTML+="<tr><td>"+currentNutritionObject.ndbno+"</td> <td> "+currentNutritionObject.name + "</td><tr>"
             // document.getElementById("nutritionData").innerHTML+="<tr><td>"+currentNutritionObject.ndbno+"</td> <td> "+currentNutritionObject.name +
             // "</td><td id='nutritioninfo' ><ul>"+ 
             //  nO.forEach(function(nutrientListI){ document.getElementById("nutritioninfo").innerHTML+= "<li>"+ nutrientListI.nutrient +"</li> "});
             //  +"</ul></td><tr>"
           });
  }
}
) (jQuery);


