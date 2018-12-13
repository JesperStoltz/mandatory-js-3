//===========1. VARIABLES================
let
hash, //This variable is used in several functions to check the hash value.
catchCaseDiff, //This variable is used primarily in the function changeHash(). See Chapter 7.
setH1; //This variable is used in functions renderText() and changeHash (See Chapter 3.2.2. respectively Chapter 7) to identify and set the correct title to the chosen breed/subbreed.

//==============2. ADDS ANONYMOUS FUNCTION LOCATION.REOLOAD ON HASHCHANGE===============
window.addEventListener("hashchange", function() { //Checks for a change in the hash and then adds the function.
    location.reload(); //Reloads the window.location. <<NOTE: Check the effect of window/body>>
});

//=================================3.DATA COLLECTING/RENDERING==========================================
//===============3.1. FUNCTION: COLLECTS THE DATA FROM THE SERVER=======================
function req(url){

    let req = new XMLHttpRequest();//Saves a constructor
    req.addEventListener("load", function(){ //Sets an eventListener with the anonymous function below, parsing the data.
    let parsedData = JSON.parse(this.responseText); //Parses the JSON-Data.
    let data = parsedData.message; //Creates a variable containing the parsed JSON-data message.
    renderText(data, url);//Calls upon the function renderText. See Chapter 2.2.
});
    req.open("GET", "https://dog.ceo/api/breed" + url); // Makes a GET-call to get the data from the server (itc: a list)
    req.send(); // Sends a HTTP-request to the browser.
}

//==========3.2. FUNCTION: CREATE A LIST FROM DATA====================
function renderText(data, url){  //This function is called upon in chapter 2.1, using parsedData.message as its argument.
    let myArray = [];   //Creates an array used below to contain key in data.

        //====================3.2.1 IF URL INCLUDES "IMAGE"=================================
        if(url.includes("image")){ //Checks if the url includes the word "image".

            let createImg = document.createElement("img"); //if url contains image, a img-element is created.
            createImg.setAttribute("src", data); //the data set in req() in chapter 2.1. is set as src to the img-element.
            let image = document.querySelector("#image"); //Variable containing the newly created img-element.
            image.insertBefore(createImg, image.childNodes[0]); //Places the image-element in the dom.
        }

        //====================3.2.2 IF THE URL DOES NOT INCLUDE "IMAGE"=================================
        //<<<<NOTE: This has to be possible to optimize into reuseable functions, revisit after finished>>>>
        else{
        if(url === "s/list/all"){ //Checks if url has the list in its content. 
            for(let key in data){ //Loops through all the keypoints in the JSON-data.
            myArray.push(key); //Places all keypoints in the variable myArray.
            }
    
              for(let i = 0; i < myArray.length; i++){ //Loops through myArray, now containing all keypoints from the JSON-data.
                let breedList = document.querySelector("#breedList"); //Selects the div breedList.
                let createLi = document.createElement("li"); //For every keypoint in the JSON-Data an list-item is create9d.
                breedList.append(createLi); //Places the list-item created above in the div breedList.
              }

                let selectLi = document.querySelectorAll("li"); //Selects all list-items as created above.
                for(let i = 0; i < selectLi.length; i++){ //Loops through all the selected list-items.
                    let createLink = document.createElement("a"); //For every list-item, an a-element is created.
                    createLink.setAttribute("href", "#" + myArray[i]); //The a-element is given the hashtag and the keypoints from the JSON-data.
                    createLink.textContent = myArray[i]; //The a-element is given the textContent of the keypoint being looped through.
                    selectLi[i].append(createLink) //Appends the a-links to the list-items created in above passage.
                }       
        }
        else{ //If the URL does not have the list in its content.
            for(let key of data){ //Loops through all the keypoints in the JSON-data.
                 myArray.push(key); //Places all keypoints in the variable myArray
                 } 
              
            for(let i = 0; i < myArray.length; i++){ //Loops through all the keypoints placed in myArray

                let subBreeds = document.querySelector("#subBreeds"); //Selects the div subBreeds.
                let createLi = document.createElement("li"); //Creates a list-item.
                subBreeds.append(createLi); //Appends list-item to the div subbreeds
                let createLink = document.createElement("a"); //Creates an a-element.
                createLink.setAttribute("href", "#" + hash + "/" + myArray[i]); //Sets the attribute of the a-link element.
                createLi.append(createLink); //Appends the a-links to the list-items created in above passage.
                    if(hash.includes("/")){ //If hash-variable includes a "/" it sets the attribute to the hashtag and the keypoints from JSON-data.
                    createLink.setAttribute("href", "#" + setH1[setH1.length-1] + "/" + myArray[i]);
                    }
                    createLink.textContent = myArray[i]; //Sets the a-elements textContent to the keypoint being looped in myArray.                                 
            }  
        }
        }
}


//=======4. FUNCTION: ADDS THE FUNCTION randomButtons(e) ONCLICK=========
function buttonClick(){

    let randomButton = document.querySelector(".randomButton"); //Selects the button randomButton.
    randomButton.addEventListener("click", randomButtons); //Sets function the randomButtons(e) to the button. See chapter 5.
    }

    buttonClick(); //Calls upon the function.

//==============5. FUNCTION: SYNERGIZES THE BUTTON BEFORE AND AFTER SPECIFIC BREED OR SUBBREED IS CHOSEN=============
function randomButtons(e){
    let eTarget = e.target; //Sets the variable eTarget to e.target. 
    
    if(eTarget.id === "breedButton"){ //Checks if e.targets id is breedButton, meaning the button created after a specific breed/subbreed is chosen.
        
        removeImage(); //Calls upon the function removeImage(). See chapter 6.
        req("/" + hash + "/images/random"); //Calls upon new image-data depending on hash.
        
    } else if(eTarget.id === "randomButton"){ //Checks if the e.targets id is randomButton, meaning the button seen before a specific breed/subbreed is chosen.
        
        removeImage(); //Calls upon the function removeImage(). See chapter 6.
        req("s/image/random"); //Calls upon new image-data from all the possible options.
    }
}

//=============6. FUNCTION: REMOVE IMAGE=============
function removeImage(){ //Exists to remove the Image when the randomButton is clicked, to make place for a new image. Used in function changeHash(). See chapter 7. 
                        //<<<NOTE: Might put this with the creation of new image? Though that might be a step in the wrong direction considering it'll lessen the
                        //reusability of the function.
        
    let selectImg = document.querySelector("img"); //Selects the image-element.
    selectImg.parentNode.removeChild(selectImg); //Removes the image from the div.
}


//=============7. FUNCTION: WHEN HASH CHANGES==========
function changeHash(){ 
    let checkForImage = document.querySelector("#image").hasChildNodes(); //Checks if the image-div has any nodes.
    let rejoinH1; //Variable which will later be used for the .join for setH1.
    let changeH1 = document.querySelector("h1"); //Selects the h1.
    let myButton = document.querySelector("input"); //Selects the randomButton. 
   
    hash = window.location.hash.substring(1); //Removes the # from the hash but instead makes the variable handle the breed/subbreed clicked. 

if (checkForImage === true){ //If the div #image has any nodes
    removeImage(); //the removeImage() is run 
    req("s/list/all") //Calls upon new data.
    }

        if(!hash.includes("/")){ //Checks if the hash contains "/" and runs if it doesn't.
        req("/" + hash + "/list"); //Calls upon new data
        req("/" + hash + "/images/random"); 
        catchCaseDiff = hash.charAt(0).toUpperCase() + hash.slice(1); //Catches the potential catch-capitalization in the url-field. Clicks work without, manual writing doesn't.
        changeH1.textContent = catchCaseDiff; //Sets the h1 to the chosen breed/subbreed.

        }
        else{ //If the hash contains a "/".
        setH1 = hash.split("/") //Splits the hash with "/" as it splitterpoint, e.g. Fox/Hound becomes Fox, Hound.
        let reverseH1 = setH1.reverse(); //Reverses the setH1 set above. <<<NOTE: I still don't get why this one is needed everytime we're split <-> joining an array. Check up!
        rejoinH1 = setH1.join(" "); //Joins the setH1 again, with space between the words.
        req("/" + setH1[setH1.length-1] + "/list"); //Calls upon new data.
        req("/" + hash + "/images/random"); //Calls upon new data.
        catchCaseDiff = rejoinH1.charAt(0).toUpperCase() + rejoinH1.slice(1); //Catches the potential catch-capitalization in the url-field. Clicks work without, manual writing doesn't.
        changeH1.textContent = catchCaseDiff; //Sets the h1 to the chosen breed/subbreed.
        }
        myButton.setAttribute("id", "breedButton"); //Sets the randomButton to the breedButton-id.
    }

//===============================8. Start Check=================================

if(window.location.hash !== ""){  //Checks if the hash is empty.

    changeHash(); //If the hash isn't empty, changeHash() is called. See chapter 7.
    req("s/list/all")  //Calls upon new data.

}
else{ //If the hash is empty, the data is gathered from all.
    req("s/list/all")
    req("s/image/random")
   
}
