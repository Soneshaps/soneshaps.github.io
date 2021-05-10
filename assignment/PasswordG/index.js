var generatedString
var passwordLength = 17

//Function to Random Password
function generatePassword(){
    
    //taking the value from the input 
    var totalLetter = document.getElementById("total-number").value
    var isLowerCase = document.getElementById("lowercase").checked
    var isUpperCase = document.getElementById("uppercase").checked
    var isNumber = document.getElementById("number").checked
    var isSymbol = document.getElementById("symbol").checked
    
    //Setting up variable 
    var lowerCase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var numbers 
    var symbol
    var upperCase = []
    for (let i = 0; i < lowerCase.length; i++) {
        upperCase[i] = lowerCase[i].toUpperCase();
        
    }
    console.log(upperCase)
    var flag = 0
    
    //Condition for checked and unchecked input
    if(isLowerCase){
         lowerCase = lowerCase ;
         flag += 1
    }else{
        lowerCase = [''];
    
    }
    
    if(isUpperCase){
        upperCase = upperCase ;
        flag += 1
    }else{
       upperCase = [''];
    }
    
    if(isNumber){
        numbers = ['0','1','2','3','4','5','6','7','8','9'];
        flag += 1
    }else{
       numbers = [''];
    }
    if(isSymbol){
        symbol = ['!','@','#','$','%','^','&','*','(',')'];
        flag += 1
    }else{
       symbol = [''];
    }

    //Getting the random index for all the cases 
    var upperCaseG = []
    var lowerCaseG = []
    var symbolG = []
    var numberG = []
    for (let j = 0; j < totalLetter; j++) {
         lowerCaseG[j] = lowerCase[Math.floor(Math.random() * lowerCase.length)];
         upperCaseG[j] = upperCase[Math.floor(Math.random() * upperCase.length)];
         symbolG[j] = symbol[Math.floor(Math.random() * symbol.length)];
         numberG[j] = numbers[Math.floor(Math.random() * numbers.length)];
        
    }

    //adding all the arrays into one array 
    var generatedArray = upperCaseG.concat(lowerCaseG,numberG,symbolG)

    //removing the ''(Empty) string from the array
    var itemToRemove = ''
    generatedArray = generatedArray.filter(item => item !== itemToRemove)
    
    //suffing the array into random index
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
    
    shuffle(generatedArray); 

    //Getting the first totalLetter 
    var spliceNumber =  totalLetter*(flag-1)
    var splicedArray = generatedArray.splice(spliceNumber)
    
    //Joining the array into string 
    generatedString = splicedArray.join('')

    //showing the password area by calling showPasswordArea()
    showPasswordArea()

    return document.getElementById('password-area').innerHTML = generatedString
}

//function for copying password 
function copyPassword() {
    var tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = generatedString || ''
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    showClipboard()
}

//function for showing password area 
function showPasswordArea(){
    var passwordArea = document.getElementById('password-area-main');
    passwordArea.style.display = 'block'
}

//function for shwoing "Password Copied" div for 500ms
function showClipboard(){
    var clipboard = document.getElementById('display-copied');
    clipboard.style.display = 'inline-block'
    setTimeout(function(){ 
        clipboard.style.display = "none";
    }, 500);
}

//function for always checking one of 4 boxes  
function balanceCheckbox() {
    var isLowerCase = document.getElementById("lowercase").checked
    var isUpperCase = document.getElementById("uppercase").checked
    var isNumber = document.getElementById("number").checked
    var isSymbol = document.getElementById("symbol").checked
    if(!isLowerCase && !isUpperCase && !isNumber && !isSymbol){
        document.getElementById("lowercase").checked = true
    }
}
balanceCheckbox()


//function for slider range and input to sync numbers 
function inputSliderRangeValue(value){
    if(value>32) value = 32;
    if(value<2) value = 2;
    passwordLength = Math.floor(value);
    document.getElementById('total-number').value = passwordLength
    document.getElementById('total-number-input').value = passwordLength
}


//function for Dark Mode and Light Mode 
var darkMode = true 

function toogleMode(){
    darkMode = !darkMode
    var body = document.getElementsByTagName('body')[0];
    var checkCircleOne = document.getElementById('slider1')
    var checkCircleTwo = document.getElementById('slider2')
    var checkCircleThree = document.getElementById('slider3')
    var checkCircleFour = document.getElementById('slider4')
    var generateButton = document.getElementById('generate-button')
    var generatePasswordArea = document.getElementById('generated-password')
    var copyArea = document.getElementById('copy-area')
    var displayCopid = document.getElementById('display-copied')

    if(!darkMode){
        body.style.backgroundColor = "#ffffff"
        body.style.color = "#424242"
        body.style.fontWeight = "600"
        checkCircleOne.classList.add("slider-light");
        checkCircleTwo.classList.add("slider-light");
        checkCircleThree.classList.add("slider-light");
        checkCircleFour.classList.add("slider-light");
        generateButton.classList.add('generate-button-light')
        generatePasswordArea.style.backgroundColor = "rgb(131 114 151)"
        generatePasswordArea.style.color = "#ffffff"
        generatePasswordArea.style.fontWeight = "400"
        copyArea.classList.add('copy-area-light')
        displayCopid.style.fontWeight = "400"


    }else{
        body.style.backgroundColor = "#121212"
        body.style.color = "#9e9e9e"
        body.style.fontWeight = "400"
        checkCircleOne.classList.remove("slider-light");
        checkCircleTwo.classList.remove("slider-light");
        checkCircleThree.classList.remove("slider-light");
        checkCircleFour.classList.remove("slider-light");
        generateButton.classList.remove('generate-button-light')
        generatePasswordArea.style.color = "#9e9e9e"
        generatePasswordArea.style.backgroundColor = "#433e47"
        copyArea.classList.remove('copy-area-light')
        displayCopid.style.fontWeight = "600"
    }
}

