function watchForm(){
  
  // Validations for the REGISTER FORM  
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

    if ( passw.value === "" ){
		passwordConfErrorMessage.textContent = "Please provide your password";
    }
    else{
      passwordConfErrorMessage.textContent = "";
    }


    if(passw.value != pass.value ){
      alert(" Passwords do not match");
    } else if( passw.value == pass.value && passw.value != ""){
      // CASE WHEN everything is ok
      let postD = $(".formElement");
      let body = {}; 
      body.name = postD[0].value;
      body.email = postD[1].value;
      body.password = postD[2].value; 
      event.preventDefault();
      // Ajax call for when 
      $.ajax({
        type: 'GET',
        url: '/employerDB/login-users/' +$('#email').val()
      }).done(function(data){
        console.log(data);
        // Mail ya existe en BD
        alert("Email already exists, write a different email or start session");
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

          alert("Register Successfully"); 
          parent.open("./home.html", "_self");        
      });
    }
  });    
  //////////// END REGISTER

 //////  START LOGIN SECTION 

 submitButtonL.addEventListener("click", ( event ) =>{
    event.preventDefault();

      // Validate the email input LOGIN
    let email_reg = document.getElementById( "email_reg" );
   
    let password_reg = document.getElementById( "password_reg" );
    let loginErrorMessage = document.getElementById( "loginErrorMessage" );


    if ( email_reg.value === "" || password_reg.value==="" ){
      loginErrorMessage.textContent = "Faltan datos  ";
    }
    else{

      let postD = $(".formElementL");
      let body = {}; 
      body.email_reg = postD[0].value;
      body.password_reg = postD[1].value; 
      event.preventDefault();
      console.log("hola"); 
      $.ajax({
        type: 'GET',
        url: '/employerDB/login-users/' +$('#email_reg').val()
      }).done(function(data){
        console.log(data);
        // Mail ya existe en BD
        console.log(data[0].password);
        console.log(body.password_reg); 
        
        if(data[0].password === body.password_reg){

           parent.open("./home.html", "_self");   
        }else{
          alert("Wrong password");
        }

      }).fail(function(data){
        // Mail es nuevo y se registrara en BD
         
          alert("User not found");      
      });

    }
  }); 
         ///////////////////////


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
 

}


watchForm();
