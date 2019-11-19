function watchForm(){
  let submitButton = document.getElementById( "submitButton" );

  let submitButtonL = document.getElementById("submitButtonL");


  submitButton.addEventListener("click", ( event ) =>{
    event.preventDefault();
    
    // Validate the fullName input
    let fullName = document.getElementById( "fullName" );
    let fullNameErrorMessage = document.getElementById( "fullNameErrorMessage" );

    if ( fullName.value === "" ){
      fullNameErrorMessage.textContent = "Please provide your name";
    }
    else{
      fullNameErrorMessage.textContent = "";
    }

    // Validate the email input
    let email = document.getElementById( "email" );
    let emailErrorMessage = document.getElementById( "emailErrorMessage" );

    if ( email.value === "" ){
      emailErrorMessage.hidden = false;
    }
    else{
      emailErrorMessage.hidden = true;
    }
	

	// Validate the password input
    let pass = document.getElementById( "password" );
    let passwordErrorMessage = document.getElementById( "passwordErrorMessage" );

    if ( pass.value === "" ){
		passwordErrorMessage.textContent = "Please provide your password";
    }
    else{
      passwordErrorMessage.textContent = "";
    }
	
	// Validate the password CONFIRM
    let passw = document.getElementById( "passwordConfirmation" );
    let passwordConfErrorMessage = document.getElementById( "passwordConfErrorMessage" );

    if ( passw.value === ""){
		passwordConfErrorMessage.textContent = "Please provide your password";
    }
    else{
      passwordConfErrorMessage.textContent = "";
    }
    if(passw !=pass ){
      passwordConfErrorMessage =" Passwords Do not match"; 
    } else{
      // CASE WHEN everything is ok

      let postD = $(".formElement");
      let body = {}; 
      body.name = postD[0].value;
      body.email = postD[1].value;
      body.password = postD[2].value; 
      event.preventDefault();


      $.ajax({
        type: 'GET',
        url: '/employerDB/login-users/' +$('#email').val()
      }).done(function(data){
        console.log(data);
        // Mail ya existe en BD
        alert("Mail ya existe, escriba uno diferente o inicie sesion");
      }).fail(function(data){
        // Mail es nuevo y se registrara en BD
          $.ajax({
            type: 'POST',
            url: '/employerDB/register-users',
            contentType: "application/json",
            data: JSON.stringify(body)
          }).done(function(data){
            console.log(data);

          }).fail(function(err){
            alert(err.responseText); 
          });

          alert("registrado exitosamente"); 
          parent.open("./home.html");        
      })



    }




      ///////// AJAX PART //////////
   



    



      // END AJAX 

	
  });

  // Functionality for the navigation menu
  let menuItems = document.getElementsByTagName( "li" );

  for ( let i = 0; i < menuItems.length; i ++ ){
    menuItems[i].addEventListener( "click", (event) =>{
      event.preventDefault();
      
      let selected = document.getElementsByClassName( "selected" );

      selected[0].className = "";

      event.target.className = "selected";

      let currentSelected = document.getElementsByClassName( "currentSelected" );

     
      currentSelected[0].hidden = true;
      currentSelected[0].className = "";

      let selectedSection = document.getElementById( event.target.id + "Section" );

      selectedSection.hidden = false;
      selectedSection.className = "currentSelected";

    });
  }

  //////////////////////////////////////
  submitButtonL.addEventListener("click", ( event ) =>{
    event.preventDefault();

      // Validate the email input LOGIN
    let email_reg = document.getElementById( "email_reg" );
    let loginErrorMessage = document.getElementById( "loginErrorMessage" );

    if ( email_reg.value === "" ){
      loginErrorMessage.hidden = false;
    }
    else{
      loginErrorMessage.hidden = true;
    }
    


  }); 

}


watchForm();
