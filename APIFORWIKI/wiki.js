function search() {

  let userInput = document.getElementById('input');
  let term = userInput.value;
  if (term.length >= 3) {
    let wikiRequest = new XMLHttpRequest();


    let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${term}&origin=*&format=json`;

    wikiRequest.open('GET', url)
    wikiRequest.send();

    wikiRequest.onreadystatechange = function () {
      if (wikiRequest.readyState == 4 && wikiRequest.status == 200) {
        var result = wikiRequest.responseText;

        var jsResult = JSON.parse(result);

        let array = jsResult.query.search;
        let n= array.length;
        if(n==0)
        {
          alert("don't so you're a  alien");
        }
        else{

        
        let output = document.getElementById('output');
        output.innerHTML = ""
        // output.removeChild(output.childNodes[0]);
        for (var i = 0; i < n; i++) {
          output.insertAdjacentHTML('beforeEnd', '<h3>' + array[i].title + '</h3>' + '<p>' + array[i].snippet + '</p>');

        }}
      }


    }
  }
  else {
   alert("please enter minimum 3 length string");
  }

}


