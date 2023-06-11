function addCharacter(){

    var div = document.getElementById("charactersList");
    var number_of_characters = document.getElementsByClassName("Characters").length+1;
    
    
    var always_more_characters = document.createElement("INPUT");
    always_more_characters.type = "button";
    always_more_characters.onclick = addCharacter;
    always_more_characters.id = "boutonMore";
    always_more_characters.value = "+";


    var maybe_not_that_much = document.createElement("INPUT");
    maybe_not_that_much.type = "button";
    maybe_not_that_much.onclick = removeCharacter.bind(this, number_of_characters);
    maybe_not_that_much.classList.add("boutonLess");
    maybe_not_that_much.id = "boutonLess" + number_of_characters;
    maybe_not_that_much.value = "-";

    new_input_field = document.createElement("input");
    new_input_field.type="text";
    new_input_field.classList.add("Characters");
    new_input_field.id = "character" + number_of_characters;
    new_input_field.placeholder = "character "+number_of_characters;

    div.removeChild(document.getElementById("boutonMore"));
    div.appendChild(new_input_field);
    div.appendChild(maybe_not_that_much);
    div.appendChild(always_more_characters);

    new_input_field.focus();
}

function removeCharacter(nb){
    var div = document.getElementById("charactersList");

    curr_input_field = document.getElementById("character"+nb);
    div.removeChild(curr_input_field);
    div.removeChild(document.getElementById("boutonLess"+nb));

    for (let i=nb+1 ; i<=document.getElementsByClassName("Characters").length+1 ; i++){
        document.getElementById("character"+i).id = "character"+(i-1);
        document.getElementById("character"+(i-1)).placeholder = "character "+(i-1);
        document.getElementById("boutonLess"+i).id = "boutonLess"+(i-1);
        document.getElementById("boutonLess"+(i-1)).onclick = removeCharacter.bind(this, i-1);
    }
}

function addToTable(){

    var myForm = document.forms.addManga;

    
    
    if (validateform(myForm)){
        var newLine = document.createElement("tr");
        var title = document.createElement("td");
        var type = document.createElement("td");
        var length = document.createElement("td");
        var releaseDate = document.createElement("td");
        var state = document.createElement("td");
        var mainChars = document.createElement("td");
        var synopsis = document.createElement("td");
        newLine.append(title, type, length, releaseDate, state, mainChars, synopsis);


        title.textContent = myForm.name.value;
        type.textContent = myForm.types.value;
        length.textContent = myForm.Length.value;
        releaseDate.textContent = myForm.rDate.value;
        state.textContent = myForm.state.value;
        
        let allNames = document.getElementsByClassName("Characters");
        let tempChars = "";
        for(let char=0; char < allNames.length; char++){
            console.log("allNames["+char+"].value : "+allNames[char].value);
            tempChars += allNames[char].value + ", ";
            console.log("tempChars : "+tempChars);
        }
        mainChars.textContent = tempChars.slice(0, -2);

        synopsis.textContent = myForm.synopsis.value;

        
        var MyTable = document.getElementById("Nexts_table");
        MyTable.appendChild(newLine);

        alert("THANK YOU!\nYour Manga will be added after a quick check-up by our teams :)");

        document.addManga.reset();
    }
}


function validateform(myForm){
    if (myForm.name.value == "") {
        alert("Please enter the name of your Manga.");
        return false;
    }
    if (myForm.types.value == "") {
        alert("Please enter the type of your Manga.");
        return false;
    }
    if (myForm.Length.value == "" || myForm.Length.value < 1){
        alert("Please enter a number of chapters greater than 1.");
        return false;
    }
    if (myForm.state.value == ""){
        alert("Please enter the state of your Manga.");
        return false;
    }
    const date = new Date();
    if (myForm.rDate.value == "" || myForm.rDate.value > date){
        alert("Please enter a valid release date.");
        return false;
    }
    let allNames = document.getElementsByClassName("Characters");
    for (let i=0; i<allNames.length; i++){
        if (allNames[i].value == ""){
            alert("Please enter a name for each character.");
            return false;
        }
    }
    if (myForm.synopsis.value == ""){
        alert("Please enter a synopsis.");
        return false;
    }
    return true;
}


document.addEventListener("DOMContentLoaded", function() { 
    document.querySelector('#addManga').addEventListener('submit',function(e){
        addToTable();
    }); 
});

