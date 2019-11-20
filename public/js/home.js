function watchForm(){
  let submitButtonPerson = document.getElementById( "submitButtonPerson" );

  submitButtonPerson.addEventListener("click", ( event ) =>{
    event.preventDefault();
    
    // Validate the fullNamePerson input
    let fullNamePerson = document.getElementById( "fullNamePerson" );
    let fullNamePersonErrorMessage = document.getElementById( "fullNamePersonErrorMessage" );

    if ( fullNamePerson.value === "" ){
      fullNamePersonErrorMessage.textContent = "Please provide your name";
    }
    else{
      fullNamePersonErrorMessage.textContent = "";
    }
	// Validate the agePerson input
    let agePerson = document.getElementById( "agePerson" );
    let agePersonErrorMessage = document.getElementById( "agePersonErrorMessage" );

    if ( agePerson.value ==="" ){
      agePersonErrorMessage.textContent = "Please provide your age";
    }
    else{
      agePersonErrorMessage.textContent = "";
    }
	
	// Validate the birthdayPerson input
    let birthdayPerson = document.getElementById( "birthdayPerson" );
    let birthdayPersonErrorMessage = document.getElementById( "birthdayPersonErrorMessage" );

    if ( birthdayPerson.value <0 ){
      birthdayPersonErrorMessage.textContent = "Please provide your birthday ";
    }
    else{
      birthdayPersonErrorMessage.textContent = "";
    }
	
	// Validate the degreePerson input
    let degreePerson = document.getElementById( "degreePerson" );
    let degreePersonErrorMessage = document.getElementById( "degreePersonErrorMessage" );

    if ( degreePerson.value ==="" ){
      degreePersonErrorMessage.textContent = "Please provide your Degree ";
    }
    else{
      degreePersonErrorMessage.textContent = "";
    }

    // Validate the emailPerson input
    let emailPerson = document.getElementById( "emailPerson" );
    let emailPersonErrorMessage = document.getElementById( "emailPersonErrorMessage" );

    if ( emailPerson.value === "" ){
      emailPersonErrorMessage.hidden = false;
    }
    else{
      emailPersonErrorMessage.hidden = true;
    }
	
	// Validate the skillsPerson input
    let skillsPerson = document.getElementById( "skillsPerson" );
    let skillsErrorMessage = document.getElementById( "skillsErrorMessage" );

    if ( skillsPerson.value === "" ){
      skillsErrorMessage.hidden = false;
    }
    else{
      skillsErrorMessage.hidden = true;
    }
	
	
	///////////////////////////////////////////////////////////////////////
	
    if( emailPerson.value && skillsPerson.value && degreePerson.value && birthdayPerson.value && agePerson.value && fullNamePerson.value){
			console.log("A"); 
	let postD = $(".formElement");
	console.log(postD); 
	
	
    let body = {}; 
      body.name = postD[0].value;
	  body.age = postD[1].value;
	  body.birthday = postD[2].value;
	  body.degree = postD[3].value;
      body.email = postD[4].value;
	  body.skills = postD[5].value;
      
      event.preventDefault();
	  
      // Ajax call for when 
      $.ajax({
        type: 'GET',
        url: '/employerDB/busqueda-persona/' +$('#emailPerson').val()
      }).done(function(data){
        console.log(data);
        // Mail ya existe en BD
        alert("Email already exists, person is probably already in database");
      }).fail(function(data){
        // Mail es nuevo y se registrara en BD
          $.ajax({
            type: 'POST',
            url: '/employerDB/create-person ',
            contentType: "application/json",
            data: JSON.stringify(body)
          }).done(function(data){
            console.log(data);

          }).fail(function(err){
            alert(err.responseText); 
          });

          alert("Person created"); 
      });
	
	
		
	}
	/////////////////////////////////////////////////
	
	
	/////////////////////////////////////////////////

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