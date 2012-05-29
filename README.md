flipcard
========

A mini-clone of isotope (http://isotope.metafizzy.co/) made using Backbone.js and Underscore themes. The reason for this? In part, I wanted a project to test out Backbone.js... and, in part, because I wanted something like isotope but didn't need the full feature set. I also wanted some additional functionality, like the ability to flip and search cards, and to feed the data through JSON instead of the DOM (allowing it to be easily plugged into a REST framework).

This was developed for the Living Archives in Western Canada Project -- http://www.eugenicsarchive.ca

Dependencies: 
========

Since this project is built using Backbone.js it requires jquery, underscore, and backbone.


<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="http://ajax.cdnjs.com/ajax/libs/underscore.js/1.3.3/underscore-min.js" type="text/javascript"></script>
<script src="http://documentcloud.github.com/backbone/backbone-min.js" type="text/javascript"></script>

Use: 
========

At this stage, it's not that easy to plug into a website unless you know where all the code is burried. One of my goals is to make a plugin architecture that will make it easy to feed data and plop it into a website. 

For now, there are three main parts to be concerned with:

(1) The JSON data object, contained in the AppView -- var data = [{}]; 
(2) The Underscore.js themes. Contained on the main html page, this let's you draw one theme for all of your cards without repeating code. 
(3) flipcard.css. All of the animation is pretty much CSS3 transforms, and it's located in this css file. Not sure how this degrades in IE8 and older. 