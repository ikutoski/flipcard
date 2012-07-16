jQuery(document).ready(function() {

/* this is the JSON object which will contain all of the data for the Heroes/Villains
  modele. It's basically an array of dictionaries. The square bracket represents the 
  array, while the curly bracket denotes the dictionary. 'title' represents the key, while
  'Alexander Graham Bell' represents the value. 

  One weird quirk -- IE 8 doesn't like a trailing comma on the last key/value pair
  of a dictionary. Weird, I know. So you can see that it's omitted after 'category'.

  Another thing -- the imageURL represents the relative URL to the image file. We need to
  select one image size and stick with it. The Bell picture I was using was 183 x 282. 
  But we should probably just round that to an even number. 

  p.s. You can validate JSON here: http://jsonlint.com/

*/
  var data = [
    {
      title: "Alexander Graham Bell",
      date: "1842",
      description: "Psychiatrist, Director of the Toronto Psychiatric Hospital",
      heroQuote: "some quote",
      villainQuote: "another evil quote",
      imageURL: "/images/Bell.jpg",
      category: "scientist"
    },
    {
      title: "Alexander Graham Bell",
      date: "1842",
      description: "Psychiatrist, Director of the Toronto Psychiatric Hospital",
      heroQuote: "fill me in",
      villainQuote: "and me too",
      imageURL: "/images/Bell.jpg",
      category: "scientist"
    },

    // more objects go here. 


  ];


  // This instantiates a new "FlipCard" view, passing in the relevant settings, including
  // the data JSON we created above. When paired with the proper HTML and Javascript files
  // it will basically run the grid-view. 

  var flipcard = new FlipCard.AppView({
          data: data,
          wrapper: "#flipcard-wrapper",
          toolbar: "#flipcard-toolbar",
          searchField: "#flipcard-search"
      });
});
