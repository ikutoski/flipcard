/**
 * Bento-Browser
 * (c) 2012 Ben McMahen
 * 
 * Bento-Browser may be freely distributed under the MIT license.
 */

$(function() {

 Card = (function(Backbone, _, $){

	var Browser = {};

	Browser.version = "0.0.1";

	Browser.options = {
		  containerWidth: $("#content").width()
		, boxesPerRow: 5
		, paddingWidth: 20
		, paddingHeight: 20
		, boxHeight: 200
		, boxWidth: 200
	};


	// Generic Card class with hide and show functions
	Browser.Card = Backbone.Model.extend({
		hide: function() {
			this.set({ hide: true });
		},
		show: function(){
			this.set({ hide: false });
		}
	});

	Browser.Cards = Backbone.Collection.extend({
		model: Browser.Card,
		filterCards: function(field, query){

			// CLEAN THIS UP

			if (!_.isUndefined(this.hidden)){
				this.showHiddenModels();
				this.restoreModels(); 
			}

			// Returns filtered card list
			var re = new RegExp(query, "i");
			var filtered = this.filter(function(card){
				return re.test(card.get(field));
			});


			if (_.isUndefined(this.originalModels)){
				this.originalModels = new Browser.Cards();
				this.originalModels.reset(this.models);
			}

			var ModelsToHide = this.reject(function(card){
				return re.test(card.get(field));
			});


			this.reset(filtered);
			this.filtered = true;
			this.determineLocation();

			this.hidden = new Browser.Cards();
			this.hidden.reset(ModelsToHide);
			this.hidden.hideModels(); 
		},
		determineLocation: function(width){
			var totalNumber = this.models.length
				, containerWidth = width || $("#content").width() || Browser.options.containerWidth
				, paddingWidth = Browser.options.paddingWidth
				, paddingHeight = Browser.options.paddingHeight
				, boxHeight = Browser.options.boxHeight
				, boxWidth = Browser.options.boxWidth;

			// Compute # Boxer Per Row (BPR)
			var boxesPerRow = Math.floor(containerWidth / (boxWidth + paddingWidth));
			
			// Compute padding width
			var mx = (containerWidth - (boxesPerRow * boxWidth) - (boxesPerRow -1) * paddingWidth) * 0.5; 

			this.each(function(cardModel, index){
				var r = Math.floor(index/boxesPerRow);
				var c = index % boxesPerRow;
				var left = mx + (c * (boxWidth + paddingWidth));
				var top = ((r * boxHeight) + (r +1) * paddingHeight);

				cardModel.set({
					position_top: top,
					position_left: left,
				});
			});

			return this; 
		},
		hideModels: function(){
			this.each(function(model) {
				model.hide();
			});
		},
		restoreModels: function() {
			var originalModels = this.originalModels.models;
			this.reset(originalModels);
			this.filtered = false;
		},
		showHiddenModels: function(){
			this.restoreModels();
			this.determineLocation();
			this.each(function(model) {
				model.show();
			});
		},
		sortModels: function(field){
			// sets comparator to search field
			this.comparator = function(model) {
				return model.get(field);
			};
			// activates the comparator 
			this.sort();
			// determines location of each model in sorted collection
			this.determineLocation();
		}
	});

	Browser.CardsView = Backbone.View.extend({
		tagName: "div",
		className: "cards",
		render: function(){
			var views = this.collection.map(function(card){
				var newCard = new Browser.CardView({ model : card});
				return newCard.render().el; 
			}, this);

			this.$el.append(views);
			return this; 
		}
		
	});

	Browser.CardView = Backbone.View.extend({
		tagName: 'div',
		className: 'card',
		template: _.template($("#card-template").html()),
		initialize: function(){
			this.model.on('change', this.render, this);
		},
		render: function(){
			this.$el.css({
				'top': this.model.get("position_top"),
				'left': this.model.get("position_left"),
			});
			if (this.model.get("hide")) {
				this.$el.addClass('hide');
			} else {
				this.$el.html(this.template(this.model.toJSON()));
				this.$el.removeClass('hide');
				return this; 
			}
		},
		events: {
			'click': 'flipCard'
		},
		flipCard: function(event){
			var $card = $(event.currentTarget);
			if ($card.hasClass('flip')) $card.removeClass('flip');
			else $card.addClass('flip');
		}
	});

	Browser.FilterView = Backbone.View.extend({
		template: _.template($("#filter-template").html()),
		render: function(){
			this.$el.html(this.template({}));
			return this; 
		},
		events: {
			'click .filter' 		: 'filterCards',
			'click .sort'			: 'sortCards',
			'keyup #bento-search'	: 'searchCards' 
		},
		filterCards: function(event){
			event.preventDefault();
			var filterField = $(event.target).data('filter-category');
			if (filterField === "all") this.collection.showHiddenModels();
			else this.collection.filterCards("category", filterField);
		},
		sortCards: function(event){
			event.preventDefault();
			var sortField = $(event.target).data('sort-field');
			if (!_.isUndefined(sortField)) this.collection.sortModels(sortField);
		},
		searchCards: function(event){
			event.preventDefault();
			var query = $("#search").val();
			this.collection.filterCards("title", query);
		}
	});


	Browser.AppView = Backbone.View.extend({
		initialize: function(options){


			this.cards = new Browser.Cards();
			this.cards.add(options.data).determineLocation();
			
			this.cardsView = new Browser.CardsView({
				collection: this.cards
			});

			$("#content").append(this.cardsView.render().el);

			var filterView = new Browser.FilterView({
				collection: this.cards
			});

			$("#filters").append(filterView.render().el);
		},
		redraw: function(){
			this.cards.determineLocation(); 
		}
	});

	return Browser; 

})(Backbone, _, window.jQuery || window.Zepto || window.ender);

});

// var tester = new Bento.AppView({data: [{name: "hello"}, {name: "hello"}
// 		, {name: "hello"}, {name: "hello"} , {name: "hello"}, {name: "hello"}, {name: "hello"}
// 		, {name: "hello"} , {name: "hello"}, {name: "hello"}, {name: "hello"}]});
// 	$(window).on('resize', function(hello){
// 		tester.cards.determineLocation();
// 	});
