// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function (event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)

  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  // console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!

  //  //write the number of movies (the array's length) to the backend console
  console.log(`There are ${moviesFromCsv.length} movies`)

  // // //write the first few movies to the backend console 
  console.log(moviesFromCsv)


  // //start with an empty array for the movies
  // let movies = []

  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre

  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Error! Please enter both year and genre.` // a string of data
    }
  } //end if statement 

  else {
    let moviesToReturn = {
      numResults: 0,
      movies: []
    }

    //loop through all movies 
    for (let i = 0; i < moviesFromCsv.length; i++) {
      let movie = moviesFromCsv[i]
      let movieYear = movie.startYear
      let movieGenre = movie.genres
      // console.log(movie.genres.includes(genre))

      if (year == movieYear && movie.runtimeMinutes != '\\N' && movieGenre != '\\N' && movie.genres.includes(genre)) {
        // Create a new post object containing the pertinent fields
        let postObject = {
          primaryTitle: movie.primaryTitle,
          movieYear: movie.startYear,
          movieGenre: movie.genres,

        }
        //add the movie to the array of movies to return to page 
        moviesToReturn.movies.push(postObject)
        moviesToReturn.numResults = moviesToReturn.numResults + 1

      }//end if statement




    }//end of loop 

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(moviesToReturn) // a string of data
    }

  } //end else statement 




}