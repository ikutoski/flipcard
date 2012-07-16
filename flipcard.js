/**
 * Bento-Browser
 * (c) 2012 Ben McMahen
 *
 * Bento-Browser may be freely distributed under the MIT license.
 */

$(function() {

	FlipCard = (function(Backbone, _, $) {

		var Browser = {};

		Browser.version = "0.0.2";

		Browser.options = {
			boxesPerRow: 5,
			paddingWidth: 20,
			paddingHeight: 20,
			boxHeight: 180,
			boxWidth: 150,
			wrapper: "#browser",
			toolbar: "#browser-toolbar",
			searchField: "#browser-search"
		};


		// Generic Card class with hide and show functions
		Browser.Card = Backbone.Model.extend({
			hide: function() {
				this.set({
					hide: true
				});
			},
			show: function() {
				this.set({
					hide: false
				});
			}
		});

		Browser.Cards = Backbone.Collection.extend({

			model: Browser.Card,

			filterCards: function(field, query) {

				if (this.hidden) this.showHiddenModels();

				var re = new RegExp(query, "i");
				var filtered = this.filter(function(card) {
					return re.test(card.get(field));
				});

				if (_.isUndefined(this.originalModels)) {
					this.originalModels = new Browser.Cards(this.models);
				}

				var ModelsToHide = this.reject(function(card) {
					return re.test(card.get(field));
				});

				this.reset(filtered);
				this.filtered = true;
				this.determineLocation();

				this.hidden = new Browser.Cards();
				this.hidden.reset(ModelsToHide).hideModels();
			},

			// Compute # Boxer Per Row (BPR)
			getBoxesPerRow: function() {
				var containerWidth = $(Browser.options.wrapper).width(),
					boxWidth = Browser.options.boxWidth,
					paddingWidth = Browser.options.paddingWidth;

				var boxesPerRow = Math.floor(containerWidth / (boxWidth + paddingWidth));
				return boxesPerRow;
			},

			// Compute padding width
			getPaddingWidth: function() {
				var containerWidth = $(Browser.options.wrapper).width(),
					boxWidth = Browser.options.boxWidth,
					paddingWidth = Browser.options.paddingWidth,
					boxesPerRow = this.getBoxesPerRow();

				var mx = (containerWidth - (boxesPerRow * boxWidth) - (boxesPerRow - 1) * paddingWidth) * 0.5;
				return mx;
			},

			// Determine location of a card
			determineLocation: function() {
				var mx = this.getPaddingWidth(),
					boxesPerRow = this.getBoxesPerRow(),
					paddingWidth = Browser.options.paddingWidth,
					paddingHeight = Browser.options.paddingHeight,
					boxHeight = Browser.options.boxHeight,
					boxWidth = Browser.options.boxWidth;

				this.each(function(cardModel, index) {
					var r = Math.floor(index / boxesPerRow),
						c = index % boxesPerRow,
						left = mx + (c * (boxWidth + paddingWidth)),
						top = ((r * boxHeight) + (r + 1) * paddingHeight);

					cardModel.set({
						position_top: top,
						position_left: left
					});
				});
				return this;
			},

			// Determine height of wrapper DIV and trigger view event
			determineWrapperHeight: function() {

				var totalNumber = this.models.length,
					paddingHeight = Browser.options.paddingHeight,
					boxHeight = Browser.options.boxHeight,
					boxWidth = Browser.options.boxWidth,
					boxesPerRow = this.getBoxesPerRow();

				var totalRows = Math.ceil(totalNumber / boxesPerRow);
				var height = totalRows * (boxHeight + paddingHeight);

				this.trigger("setHeight", height);
				return height;

			},

			// Hides each model in the collection. 
			hideModels: function() {
				this.each(function(model) {
					model.hide();
				});
			},

			// Helper function for restoring models in collection.
			restoreModels: function() {
				this.reset(this.originalModels.models);
				this.filtered = false;
			},

			// Helper function for showing and restoring models in collection.
			showHiddenModels: function() {
				this.restoreModels();
				this.each(function(model) {
					model.show();
				});
			},

			// Sets comparator, activates it, and determines location.
			sortModels: function(field) {
				this.comparator = function(model) {
					return model.get(field);
				};
				this.sort().determineLocation();
			}
		});

		Browser.CardsView = Backbone.View.extend({
			tagName: "div",
			className: "cards",
			initialize: function(options) {
				this.collection.on('setHeight', this.setHeight, this);
			},
			render: function() {
				var views = this.collection.map(function(card) {
					var newCard = new Browser.CardView({
						model: card
					});
					return newCard.render().el;
				}, this);

				this.$el.append(views);
				return this;
			},
			setHeight: function(height) {
				this.$el.height(height);
			}

		});

		Browser.CardView = Backbone.View.extend({
			tagName: 'div',
			className: 'card',
			template: _.template($("#bento-item").html()),
			initialize: function() {
				this.model.on('change', this.redraw, this);
			},
			render: function(options) {
				this.$el.html(this.template(this.model.toJSON()));
				this.redraw();
				return this;
			},
			redraw: function() {
				this.changePosition().showOrHideCard();
			},
			changePosition: function() {
				this.$el.css({
					'top': this.model.get("position_top"),
					'left': this.model.get("position_left")
				});
				return this;
			},
			showOrHideCard: function() {
				if (this.model.get("hide")) this.$el.addClass('hide');
				else this.$el.removeClass('hide');
				return this;
			},
			flipCard: function(event) {
				var $card = $(event.currentTarget);
				if ($card.hasClass('flip')) $card.removeClass('flip');
				else $card.addClass('flip');
			}
		});

		/*
	The filterview provides built-in methods and events for using filters
	with the collection data. This needs to be generalized. 
*/
		Browser.FilterView = Backbone.View.extend({
			template: _.template($("#browser-toolbar-template").html()),
			render: function() {
				this.$el.html(this.template({}));
				return this;
			},
			events: {
				'click .filter': 'filterCards',
				'click .sort': 'sortCards',
				'keyup #bento-search': 'searchCards'
			},
			filterCards: function(event) {
				event.preventDefault();
				var filterField = $(event.target).data('filter-category');
				if (filterField === "all") this.collection.showHiddenModels();
				else this.collection.filterCards("category", filterField);
			},
			sortCards: function(event) {
				event.preventDefault();
				var sortField = $(event.target).data('sort-field');
				if (!_.isUndefined(sortField)) this.collection.sortModels(sortField);
			},
			searchCards: function(event) {
				event.preventDefault();
				var query = $(Browser.options.searchField).val();
				this.collection.filterCards("title", query);
			}
		});

		/*
	The appview handles initialization of the browser by creating the
	necessary collections and views. It also handles options/defaults.
*/
		Browser.AppView = Backbone.View.extend({
			initialize: function(options) {

				// Set Browser Options
				Browser.options = _.defaults(options, Browser.options);

				// Create new Cards collection, add data, and determine location.
				this.cards = new Browser.Cards();
				this.cards.add(Browser.options.data).determineLocation();

				// Create the view with the data and append to DOM
				this.cardsView = new Browser.CardsView({
					collection: this.cards
				});
				this.cards.determineWrapperHeight();
				$(Browser.options.wrapper).append(this.cardsView.render().el);

				// Create filters/sorts/search view and append to DOM
				var filterView = new Browser.FilterView({
					collection: this.cards
				});
				$(Browser.options.toolbar).append(filterView.render().el);
			},
			redraw: function() {
				this.cards.determineLocation();
			}
		});

		return Browser;

	})(Backbone, _, window.jQuery || window.Zepto || window.ender);

});