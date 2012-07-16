#flipcard

A mini-clone of isotope (http://isotope.metafizzy.co/) made using Backbone.js. Why? Because I wanted to learn Backbone.js and because I wanted something like isotope, but with a smaller footprint and some (specialized) flexibility. I wanted the data to exist in JSON (instead of the DOM), I only needed a basic grid-view, and I wanted a "flip" functionality. 

This project was funded by and developed for the Living Archives in Western Canada Project.  -- http://www.eugenicsarchive.ca

##Dependencies: 

Flipcard requires jQuery, Underscore, and Backbone. 

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="http://ajax.cdnjs.com/ajax/libs/underscore.js/1.3.3/underscore-min.js" type="text/javascript"></script>
<script src="http://documentcloud.github.com/backbone/backbone-min.js" type="text/javascript"></script>

##Use: 

In a Javascript file included in your HTML file, you need to instantiate a new FlipCard.AppView and pass in certain attributes, including your JSON data object, the ID or Class of your wrapper, toolbar, and searchField DOM objects, and your templates.

```javascript

      var data = [{
        title: "my title",
        thumbnail: "/images/bacon.jpg"
      },
      {
        title: "another title",
        thumbnail: "/images/more-bacon.jpg"
      }];
  
      var myBrowser = new FlipCard.AppView({
          data: data
        , wrapper: "#bento"
        , toolbar: "#browser-toolbar"
        , searchField: "#bento-search"
        , cardViewTemplate: _.template($("#bento-item").html())
        , toolbarTemplate: _.template($("#browser-toolbar-template").html())
        , sortClass: ".browser-sort"
        , filterClass: ".browser-filter"
      });

```
Your templates can be built using Handlebars, Hogan, or whatever template engine you'd like, but for simplicity I'm using underscore.js templating. Include your template script in your HTML page, using an example like the one below. 

```javascript
<script type="text/template" id="bento-item">
                  <div class="bento-item">
                    <img src="<%= thumbnail %>">
                    <p> <%= title %> </p>
                  </div>
</script>

<script type="text/template" id="browser-toolbar-template">
                  <div class="btn-group">
                    <button class="btn grey browser-sort" data-sort-field="title">Name</button> 
                    <button class="btn grey browser-sort" data-sort-field="category">Category</button> 
                    <button class="btn grey browser-sort" data-sort-field="date">Date</button>
                  </div>
                  <input id="bento-search" type="text" class="input" placeholder="Filter Cards...">
</script>
```
The field you want the cards sorted by should be in the data-sort-field attribute. 

Want to add some custom javascript functions? Let's say you want to trigger an event when the user clicks on one of the cards. You would do this using the prototype attribute. 

```javascript
      FlipCard.CardView.prototype.events = {
        'click' : 'alert'
      };

      FlipCard.CardView.prototype.alert = function(){
        alert("hello");
      };
```
Now, when the user clicks on a card it will call the 'alert' function, which will display an alert message with the text "hello". You could also alter the source itself, but to make updates easier, I'd use the prototype attribute. 

All of the animation relies on CSS. To do transitions, to hide cards, etc., you'll need to implement the approriate CSS. 

```css
div.card {

      -webkit-transform: translate3d(0, 0, 0) scale3d(1,1,1);
      -moz-transform: translate3d(0, 0, 0) scale3d(1,1,1);
      -o-transform: translate3d(0, 0, 0) scale3d(1,1,1);
      -ms-transform: translate3d(0, 0, 0) scale3d(1,1,1);
      transform: translate3d(0, 0, 0) scale3d(1,1,1);

      -webkit-transition-property: -webkit-transform, opacity, top, left;
      -moz-transition-property: -moz-transform, opacity, top, left;
      -o-transition-property: -o-transform, opacity, top, left;
      -ms-transition-property: -ms-transform, opacity, top, left;
      transition-property: transform, opacity, top, left;

      -webkit-transform-style: preserve-3d;
      -webkit-backface-visibility: hidden;

      -webkit-transition-duration: 0.5s;
      -moz-transition-duration: 0.8s;
      -o-transition-duration: 0.8s;
      -ms-transition-duration: 0.8s;
      transition-duration: 0.8s;
      display: block;
      position: absolute;
      width: 150px;
      height: 150px;

      z-index: 2;
      cursor: pointer;
}

div.hide {
  opacity: 0;
     -webkit-transform: scale3d(0.001, 0.001, 1);
        z-index: 1;
      pointer-events: none;
}
```

You can do whatever you want here. These animations emulate the ones found in isotope. But you could do simple fades, or no animations at all, to improve performance. Also note that these animations are dependent upon modern browsers. i.e., this won't work in IE. (See what I did there?). I recommend adding some IE specific fall-back CSS so that it still works, albeit without animation. I havn't bothered with jQuery animations. I think it's too slow on browsers that don't support CSS3 transitions anyway. 