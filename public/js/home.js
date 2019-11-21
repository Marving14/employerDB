function watchForm(){
  let submitButtonPerson = document.getElementById( "submitButtonPerson" );
  let submitButtonProject = document.getElementById( "submitButtonProject" );

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

    if ( birthdayPerson.value ==="" ){
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
      emailPersonErrorMessage.textContent = "Please provide your email ";
    }
    else{
      emailPersonErrorMessage.hidden = true;
    }
	
	// Validate the skillsPerson input
    let skillsPerson = document.getElementById( "skillsPerson" );
    let skillsErrorMessage = document.getElementById( "skillsErrorMessage" );

    if ( skillsPerson.value === "" ){
      skillsErrorMessage.hidden = false;
		skillsErrorMessage.textContent = "Please provide your skills ";
    }
    else{
      skillsErrorMessage.hidden = true;
    }
	
	
	///////////////////////////////////////////////////////////////////////
	
    if( emailPerson.value !="" && birthdayPerson.value != "" && skillsPerson.value!="" && degreePerson.value!="" && fullNamePerson.value!="" && agePerson.value!="" ){
			console.log("A"); 
	let postD = $(".formElementPerson");
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
            url: '/employerDB/create-person',
            contentType: "application/json",
            data: JSON.stringify(body)
          }).done(function(data){
            console.log(data);

          }).fail(function(err){
            alert(err.responseText); 
          });

          alert("Person created");
          // Clean Input 
          

      });
	
	
		
	}
	/////////////////////////////////////////////////
	
	
	/////////////////////////////////////////////////

  });
  
  
   submitButtonProject.addEventListener("click", ( event ) =>{
    event.preventDefault();
		console.log("entra Submit project"); 
	
		
		// Validate the IdentifierProject input
		let IdentifierProject = document.getElementById( "IdentifierProject" );
		let IdentifierProjectErrorMessage = document.getElementById( "IdentifierProjectErrorMessage" );

		if ( IdentifierProject.value === "" ){
		  IdentifierProjectErrorMessage.textContent = "Please provide your project's identifier ";
		}
		else{
		  IdentifierProjectErrorMessage.textContent = "";
		}
		
		
		// Validate the fullNameProject input
		let fullNameProject = document.getElementById( "fullNameProject" );
		let fullNameProjectErrorMessage = document.getElementById( "fullNameProjectErrorMessage" );

		if ( fullNameProject.value === "" ){
		  fullNameProjectErrorMessage.textContent = "Please provide your project's name";
		}
		else{
		  fullNameProjectErrorMessage.textContent = "";
		}
		
		// Validate the sizeProject input
		let sizeProject = document.getElementById( "sizeProject" );
		let sizeProjectErrorMessage = document.getElementById( "sizeProjectErrorMessage" );

		if ( sizeProject.value === "" ){
		  sizeProjectErrorMessage.textContent = "Please provide your project's size ";
		}
		else{
		  sizeProjectErrorMessage.textContent = "";
		}
		
		// Validate the descriptionProject input
		let descriptionProject = document.getElementById( "descriptionProject" );
		let descriptionProjectErrorMessage = document.getElementById( "descriptionProjectErrorMessage" );

		if ( descriptionProject.value === "" ){
		  descriptionProjectErrorMessage.textContent = "Please provide your project's description ";
		}
		else{
		  descriptionProjectErrorMessage.textContent = "";
		}
		
		
    if( IdentifierProject.value!="" && descriptionProject.value!="" && sizeProject.value!="" && fullNameProject.value!="" ){
			console.log("project A"); 
	let postD = $(".formElementProject");
	console.log(postD); 
	
	
    let body = {}; 
      body.identifier = postD[0].value;
	  body.name = postD[1].value;
	  body.size = postD[2].value;
	  body.description = postD[3].value;
     
      
      event.preventDefault();
	  
      // Ajax call for when 
      $.ajax({
        type: 'GET',
        url: '/employerDB/busqueda-proyecto/' +$('#IdentifierProject').val()
      }).done(function(data){
        console.log(data);
        // Identifier ya existe en BD
        alert("Identifier already exists, use a different id");
      }).fail(function(data){
        // identifier es nuevo y se registrara en BD
          $.ajax({
            type: 'POST',
            url: '/employerDB/create-project',
            contentType: "application/json",
            data: JSON.stringify(body)
          }).done(function(data){
            console.log(data);

          }).fail(function(err){
            alert(err.responseText); 
          });

          alert("Project created"); 
      });
		
	}	
	
   });


   ////////////////////////////////////////////////////////////////////////

   let SearchUpdatePerson = document.getElementById( "submitButtonSearchUpdatePerson" );
   let submitButtonPersonUpdate = document.getElementById("submitButtonPersonUpdate");


   SearchUpdatePerson.addEventListener("click", ( event ) =>{
    event.preventDefault();
    console.log("entra a Search Update Person "); 


     // Ajax call for when 
      $.ajax({
        type: 'GET',
        url: '/employerDB/busqueda-persona/' +$('#itemToAdd').val()
      }).done(function(data){
        console.log(data);
		
		 $('#fullNamePersonUpdate').val(data[0].name);
		 $('#agePersonUpdate').val(data[0].age);
		 $('#birthdayPersonUpdate').val(data[0].birthday);
		 $('#degreePersonUpdate').val(data[0].degree);
		 $('#emailPersonUpdate').val(data[0].email);
		 $('#skillsPersonUpdate').val(data[0].skills);
		 
		 
		 
		 
        // Mail encontrado  existe en BD
	  }).fail(function(err){
            alert(err.responseText); 
	  }); 
	  
      

	});


    ///////////////////////////////////////////////////////

    submitButtonPersonUpdate.addEventListener("click", ( event ) =>{
      event.preventDefault();
      console.log("entra a submitButtonPersonUpdate  "); 
      
         let postD = $(".formElementPersonUpdate");
        console.log(postD); 
      
      
        let body = {}; 
          body.name = postD[0].value;
        body.age = postD[1].value;
        body.birthday = postD[2].value;
        body.degree = postD[3].value;
          body.email = postD[4].value;
        body.skills = postD[5].value;

         $.ajax({
            type:'PUT',
            url:'/employerDB/update-person'+body.email,
            contentType: "application/json",
            data: JSON.stringify(body)
        }).done(function(data){
            console.log(data);
           // loadList();
           alert("Datos de usuario actualizados");
        }).fail(function(msg){
            alert(msg.responseText);
        });

        alert("User not found in data base");
      }); 



   ////////////////////////////////////////////////////////////////////////
  
	

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