// JavaScript Document

function init(){
	 $(function() {
        $('.lazy').Lazy();
    });
	screen.orientation.lock('portrait').then(function success() {
console.log("Successfully locked the orientation");
},function error(errMsg) {
console.log("Error locking the orientation :: " + errMsg);
});
	  document.getElementById("checkin").addEventListener("click",function() {scanBarcode();});
	  if (localStorage.count){
		  fillCard();
	  }else{
		  localStorage.count=0;
		  fillCard();
	  }
	  
	  if (localStorage.phrase){
		  document.getElementById("header").innerHTML=localStorage.phrase;
	  }
	  }
	  
	  function remove(){
		  var c = document.getElementById("card");
		  while (c.hasChildNodes()) {
    		c.removeChild(c.lastChild);
		  	}
	  }
	  
	  function fillBlank(){
		
		  var c = document.getElementById("card");
		 
			 for (var i = 0; i < 10;i++){
				 
			  var space = document.createElement("DIV");
				 if (i==0){
					  space.className+="col-xs-6";
				 }else{
					 space.className+="col-xs-6";
				 }
			  
				//space.style.width="80";
			  var star = document.createElement("IMG");
			  star.style.width="100%";
			  star.src="img/starE.png";
			  space.appendChild(star);
			  c.appendChild(space);
	  }
	  }
	  
	  function redeam(){
		  localStorage.setItem("count",localStorage.getItem("count")-10);
		  
		  remove();
		   var r = document.getElementById("redemption");
		  while (r.hasChildNodes()) {
    		r.removeChild(r.lastChild);
		  	}
		  fillCard();
		  c=document.getElementById("card");
		  var title = document.createElement("H2");
		  var d = new Date();
		  title.innerHTML="You have unlocked one free haircut for use on "+(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
		  localStorage.setItem("phrase","You have unlocked one free haircut for use on "+(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear());
		  c.appendChild(title);
		 
	  }
	  
	  function fillCard(){
		 // remove();
		  var c = document.getElementById("card");
		  if (localStorage.getItem("count")>=10 ){
			 for (var i = 0; i < 10;i++){
			  var space = document.createElement("DIV");
			    space.className+="col-xs-6";
				// space.style.width="80";
			  var star = document.createElement("IMG");
			 star.style.width="100%";
			  star.src="img/star.png";
			  space.appendChild(star);
			  c.appendChild(space);
				
			 }
			   var b = document.createElement("DIV");
				 b.id="redeem";
			  		
				 b.innerHTML="You have unlocked a free haircut, tap here to redeem";
				 b.className+="btn btn-success";	
			  /*b.style.color="#fff";
			  b.style.backgroundColor="#5cb85c";
			  b.style.borderColor="#4cae4c";
			  b.style.padding="6px 12px";
			   */
			  //	b.href="#rewards";
			  //b.dataset.toggle="tab";
			b.style.marginTop="18";
				 document.getElementById("redemption").appendChild(b);
			  document.getElementById("redeem").addEventListener("click", function() {redeam();});
			   
			  







				 
		  }else{
		  
		  for (var i = 0; i < localStorage.getItem("count")%10;i++){
			  var space = document.createElement("DIV");
			     space.className+="col-xs-6";
			//space.style.width="80";
			  var star = document.createElement("IMG");
			  star.style.width="100%";
			  star.src="img/star.png";
			  space.appendChild(star);
			  c.appendChild(space);
		  }
		  for (var i = 0; i < 10-(localStorage.getItem("count")%10);i++){
			  var space = document.createElement("DIV");
			  space.className+="col-xs-6";
			  var star = document.createElement("IMG");
			 star.style.width="100%";
			  star.src="img/starE.png";
			  space.appendChild(star);
			  c.appendChild(space);
		  }
		  }
	  }
	  function scanBarcode(){
		   cordova.plugins.barcodeScanner.scan(
      function (result) {
		  var d = new Date();
		  var current = (d.getMonth()+1)*1000000+d.getDate()*10000+d.getFullYear()+123456789;
		  if (result.text == current){
			   var data=[];
			 
			  if(localStorage.getItem("dates") == null){
				 data.push(current);
				  localStorage.setItem("count",1);
			  }else{
				  data = JSON.parse(localStorage.getItem("dates"));
				  if (data.contains(current) == false){
					data.push(current);
					  localStorage.setItem("count",localStorage.getItem("count")+1);
				  }
				  
			  }
			  localStorage.setItem("dates",JSON.stringify(data));
			  remove();
			  fillCard();
		  }
         
      },
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
		
	  }