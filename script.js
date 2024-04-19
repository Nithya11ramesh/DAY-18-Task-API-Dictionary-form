let form = document.querySelector(".dictionaryForm");
let wordInput = document.querySelector(".wordInput");
let wordInfo = document.querySelector(".meaning");
let searchButton = document.querySelector(".searchBtn");
let spinner = document.querySelector(".loading");

                                           
  async function getmeaning(word) {            // getmeaning function
  
  spinner.classList.add("active");               // make a api request with the word
  setTimeout(() => {
    spinner.classList.remove("active");
  }, 2000);


  try {
    const response = await fetch( `https://api.dictionaryapi.dev/api/v2/entries/en/${word}` ); //fetch the api
  
    const data = await response.json();                      // get the meaning
                                    
    let paragraph = document.createElement("p");             // parse the json to js object
   
    wordInfo.innerHTML = "";                      //reset the paragraph to get new data
    


 let audioSource = data[0].phonetics[0].audio;
    // set the content of the paragraph element
    paragraph.innerHTML = `
        <h3><i><span class='fas fa-volume-up audio-icon'></span>
        <audio class='audio'>
            <source src=${audioSource} type='audio/mpeg'>
        </audio>
        Word: <b class="font-italic">${data[0].word}</b></i></h3>`;
    // append the created paragraph to the wordInfo
    wordInfo.appendChild(paragraph);
    document.querySelector(".audio-icon").addEventListener("click", (event) => {
      document.querySelector(".audio").play();
    });


    // create a list
    let list = document.createElement("ul");
    list.style.listStyleType = "none";
    let meanings = data[0].meanings;
    for (let meaning of meanings) {


    // create a list item
      let listItem = document.createElement("li");
      listItem.classList.add("text-warning", "display-6", "p-1");
      // set the content of the list item
      listItem.innerHTML = `${meaning.partOfSpeech}`;

    // create a sublist to display the meanings in every

      let subList = document.createElement("ul");
      subList.style.listStyleType = "disc";
      // get the definitions
      let definitions = meaning.definitions;
      for (let definition of definitions) {

 
   // create a list item
        let subListItem = document.createElement("li");
        subListItem.classList.add("text-warning", "fs-6", "p-1");
        // set the content of the list item
        subListItem.innerHTML = `<em>${definition.definition}</em>`;
        // append the list item to the list
        subList.appendChild(subListItem);
      }
      listItem.appendChild(subList);
      // append the list item to the list
      list.appendChild(listItem);
    }
    wordInfo.appendChild(list);


  }
  catch (error) {
   
  console.log("error fetching the meaning of the word");
  
}
}
form.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  let word = wordInput.value.trim();
  if (word.length) {
    getmeaning(word);
  } else {
    alert("please type the word");
  }
  form.reset();
}


searchButton.addEventListener("click", handleSubmit)

