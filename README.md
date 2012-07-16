#flipcard

A mini-clone of isotope (http://isotope.metafizzy.co/) made using Backbone.js. Why? Because I wanted to learn Backbone.js and because I wanted something like isotope, but with a smaller footprint and some (specialized) flexibility. I wanted the data to exist in JSON (instead of the DOM), I only needed a basic grid-view, and I wanted a "flip" functionality. 

This project was funded by and developed for the Living Archives in Western Canada Project.  -- http://www.eugenicsarchive.ca

##Dependencies: 

Flipcard requires jQuery, Underscore, and Backbone. 

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="http://ajax.cdnjs.com/ajax/libs/underscore.js/1.3.3/underscore-min.js" type="text/javascript"></script>
<script src="http://documentcloud.github.com/backbone/backbone-min.js" type="text/javascript"></script>

##Use: 

In a Javascript file included in your HTML file, you need to instantiate a new FlipCard.AppView and pass in certain attributes, including your JSON data object, and the ID or Class of your wrapper, toolbar, and searchField DOM objects.

```javascript
    var myBrowser = new FlipCard.AppView({
          data: data
        , wrapper: "#browser"
        , toolbar: "#browser-toolbar"
        , searchField: "#browser-search"
      });
```

You'll need to include two templates, using underscore templating. Here's an example template for each card.

```javascript
<script type="text/template" id="bento-item">
                  <div class="bento-item dropdown">
                    <img src="<%= thumbnail %>">
                    <% position_left %>
                    <p> <%= title %> </p>
                    <button class="btn grey dropdown-toggle" data-toggle="dropdown">
                      <i class="icon-cog"></i>
                      <span class="caret-dark"></span>
                    </button>
                  </div>
</script>
```