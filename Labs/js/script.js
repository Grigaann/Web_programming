console.log("I'm the console !");

function welcome(){
    alert("Your password has not been added :)");
}


function generate(){

    var myForm = document.forms.ajoutPWD;
    console.log(myForm);

    
    var newLine = document.createElement("tr");
    var col1 = document.createElement("td");
    var col2 = document.createElement("td");
    var col3 = document.createElement("td");
    var col4 = document.createElement("td");
    var col5 = document.createElement("td");
    col5.className = "pwd_column";

    var duration = document.createElement("td");
    duration.classList.add("duration");

    newLine.append(col1, col2, col3, col4, col5, duration);

    var idTab = document.getElementById("PWD_table");
    idTab.appendChild(newLine);

    var minuscule = "abcdefghijklmnopqrstuvwxyz";
    var majuscule = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var chiffre = "0123456789";
    var symbole = "%!&*^()#$:";
    
    if (validateform(myForm)){
        do{
            var password = "";
            let listechar = "";


            if (myForm.elements["Minuscule"].checked) {
                listechar += minuscule;
            }
            if (myForm.elements["Majuscule"].checked) {
                listechar += majuscule;
            }
            if (myForm.elements["Chiffre"].checked) {
                listechar += chiffre;
            }
            if (myForm.elements["Symbole"].checked) {
                listechar += symbole;
            }
            for (let i = 0; i < myForm.Nombre.value; i++) {
                random_value = Math.floor(Math.random() * listechar.length);
                password += listechar.substring(random_value, random_value + 1);
            }

            col1.textContent = myForm.Nombre.value;
            const date = new Date();
            col2.textContent = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
            col3.textContent = `Usage ${myForm.Categories.value}`;
            col4.textContent = myForm.site.value;
            col5.textContent = password;
            duration.textContent = "0";


            console.log(password+"\n");

            var check_min, check_maj, check_chiffre, check_symbole = true;
            if (myForm.elements["Minuscule"].checked) {
                check_min = password_isgreatenough(password, minuscule);
            }
            if (myForm.elements["Majuscule"].checked) {
                check_maj = password_isgreatenough(password, majuscule);
            }
            if (myForm.elements["Chiffre"].checked) {
                check_chiffre = password_isgreatenough(password, chiffre);
            }
            if (myForm.elements["Symbole"].checked) {
                check_symbole = password_isgreatenough(password, symbole);
            }
        }while ((check_min==false) || (check_maj==false) || (check_chiffre==false) || (check_symbole==false));

        

        alert("Your password has been added :)");
    }
    setInterval(increase_duration, 1000);

    document.ajoutPWD.reset();

    PWD_Entered(password);
    
}


function validateform(myForm){
    let okay = false;
    let checkboxs = myForm.elements;
    for(let i=0; i<checkboxs.length; i++){
        if(checkboxs[i].checked){
            okay=true;
            break;
        }
    }
    if (!okay){
        alert("Please check a checkbox.");
        return false;
    }

    if (myForm.Nombre.value == "" || myForm.Nombre.value < 8 || myForm.Nombre.value > 101){
        alert("Please enter a number of characters between 8 and 100.");
        return false;
    }

    if (myForm.Categories.value == ""){
        alert("Please enter the category of you customized password.");
        return false;
    } 

    if (myForm.site.value == ""){
        alert("Please enter the site for which you will use the password.");
        return false;
    }
    return true;
}

function password_isgreatenough(pwd, listechar){
    for (let letter=0; letter < pwd.length; letter++){
        for (let char=0; char < listechar.length; char++){
            if (pwd[letter] == listechar[char]){
                return true;
            }
        }
    }
    return false;
}

function increase_duration(){
    let timelimit = 15;
    let durations = document.getElementsByClassName("duration")
    let pwd_column = document.getElementsByClassName("pwd_column");
    if (durations.length != 0) {
        Array.prototype.forEach.call(durations, function(element_of_durations) {
            let value = parseInt(element_of_durations.textContent);
            if (value < timelimit){
                element_of_durations.textContent = value + 1;
            }
            else if (value === timelimit){
                element_of_durations.style.color = "lightgray";
                element_of_durations.previousSibling.textContent = "Expired!";
            }
        });
    }
}



document.addEventListener("DOMContentLoaded", function() { 
    document.querySelector('#addPWD').addEventListener('submit',function(e){
        generate();
    }); 
});

function delete_PWD(){
    let myTable = document.getElementById('PWD_table')
    if(confirm("Do you really want to delete all the passwords ?")){
        document.ajoutPWD.submit();
        for (let row=1;row<myTable.rows.length;row++){
            myTable.removeChild(row)
        }
    }
}

function PWD_Entered(password){

    var myForm = document.forms.ajoutPWD;
    const NewPwd = {
        number : myForm.Nombre.value,
        date : myForm.date.value,
        categorie : myForm.categories.value,
        site : myForm.site.value,
        pwd : password,
    }

    console.log(NewPwd);
}


