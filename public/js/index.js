
function watchForm(){
  let submitButton = document.getElementById( "submitButton" );

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
}

watchForm();