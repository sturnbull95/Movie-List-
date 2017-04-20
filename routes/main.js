
var req = new XMLHttpRequest();
var fltrDirector = "";

document.addEventListener('DOMContentLoaded', getMovieList);

function applyFilter(){
  fltrDirector = document.getElementById('director').value;
  getMovieList();
  clearDirectorField();
}
function clearDirectorField() {
    document.getElementById("director").value="";
}
function clearAddMovieField() {
    document.getElementById("movieDirector").value="";
    document.getElementById("movieYear").value="";
    document.getElementById("movieTitle").value="";
}

function getMovieList(){
  req.open('GET', 'http://localhost:3000/api/movies?director=' + fltrDirector, true);
  req.onreadystatechange = function(){
    if (req.status >= 200 && req.status < 400){
      var jObj = JSON.parse(this.responseText);
      var movList = document.getElementById("movie-list");
      movList.innerHTML = "";
      for(itr in jObj){
        movList.innerHTML += "<tr> <td>" + jObj[itr].title + "</td> <td> " + jObj[itr].director + " </td> <td> " + jObj[itr].year + " </td> </tr>";
      }
      console.log(jObj);
    }
  }
  req.send();
}

function createNew(){
  req.open('POST', 'http://localhost:3000/api/movies/create', true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  var title = document.getElementById('movieTitle').value;
  var director = document.getElementById('movieDirector').value;
  var year = document.getElementById('movieYear').value;
  req.onreadystatechange = function(){
    if (req.status >= 200 && req.status < 400){
      var jObj = JSON.parse(this.responseText);
      if(jObj.true){
        console.log("Save Successful");
        getMovieList();
      }
      else{
        console.log('Save Fail');
      }
    }
  }
  clearAddMovieField();
  req.send("title="+title+"&director="+director+"&year="+year);
}
