$(function() {

	window.FlipCard = {
		// put settings here
		container_width: $("#content").width(),
		boxes_per_row: 6,
		padding_width: 20,
		padding_height: 20,
		box_height: 282,
		data: [{
			title: 'Alexander Graham Bell',
			date: "1847",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'scientist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Alexander Graham Bell',
			date: "1847",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'scientist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Roger Graham Bell',
			date: "1856",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'artist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Alexander Graham Bell',
			date: "1847",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'politician',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Alexander Graham Bell',
			date: "1900",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'scientist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Alexander Graham Bell',
			date: "1847",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'scientist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Alexander Graham Bell',
			date: "1822",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'scientist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Albert Graham Bell',
			date: "1847",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'scientist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Alexander Graham Bell',
			date: "1650",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'politician',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Robert Graham Bell',
			date: "1847",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'scientist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Jason Graham Bell',
			date: "1847",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'scientist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Alexander Graham Bell',
			date: "1527",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'artist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Alexander Graham Bell',
			date: "1847",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'scientist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Fred Graham Bell',
			date: "1992",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'politician',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Alexander Graham Bell',
			date: "1847",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'politician',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Peanut Graham Bell',
			date: "1847",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'scientist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Alexander Graham Bell',
			date: "1847",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'scientist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Ben Graham Bell',
			date: "1776",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'scientist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Alexander Graham Bell',
			date: "1847",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'politician',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Alexander Graham Bell',
			date: "2010",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'scientist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}, {
			title: 'Alexander Graham Bell',
			date: "1847",
			description: 'Psychiatrist, Director of the Toronto Psychiatric Hospital',
			category: 'artist',
			image: 'images/Bell.jpg',
			heroquote: "I was a hero",
			villainquote: "I was a villain"
		}]

	};

	FlipCard.Card = Backbone.Model.extend({
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

	FlipCard.Cards = Backbone.Collection.extend({
		model: FlipCard.Card,
		filterCards: function(field, query) {

			// TO DO: Make this more efficient. It's pretty piss-poor, but works for now.
			// restore and show hidden on every new input -- this means that combined 
			// filters should be handled in the regex. kinda limited.
			// if there are hidden models, show them and restore them - used for switching filters
			if (this.hidden) {
				this.showHiddenModels();
				this.restoreModels();
			}

			var re = new RegExp(query, "i");
			var filtered = this.filter(function(model) {
				return re.test(model.get(field));
			});

			// only set original models if the set is not already filtered
			if (typeof this.original_models === 'undefined') {
				this.original_models = new FlipCard.Cards();
				this.original_models.reset(this.models);
			}

			// make a list of models that should be hidden
			var models_to_hide = this.reject(function(model) {
				return re.test(model.get(field));
			});

			this.reset(filtered);
			this.filtered = true;
			this.determineLocation();

			this.hidden = new FlipCard.Cards();
			this.hidden.reset(models_to_hide);
			this.hidden.hideModels();
		},
		determineLocation: function() {
			// TO DO: Set these up as app "options"
			var totalnumber = this.models.length,
				container_width = FlipCard.container_width,
				padding_width = FlipCard.padding_width,
				padding_height = FlipCard.padding_height,
				box_width = FlipCard.box_width,
				box_height = FlipCard.box_height,
				bpr = FlipCard.boxes_per_row;

			// Compute box width
			var box_width = box_width || (container_width / bpr) - padding_width;

			// Compute # Boxer Per Row (BPR)
			// var bpr = boxes_per_row || Math.floor(container_width / (box_width + padding_width));
			// Compute padding width
			// var mx = (container_width - (bpr * box_width) - (bpr -1) * padding_width) * 0.5; 
			// Determine Row (r) and Column (c) of each box, & top (top) and left (left) of each
			this.each(function(model, index) {
				var r = Math.floor(index / bpr);
				var c = index % bpr;

				// var left = mx + (c * (box_width + padding_width));
				var left = (box_width * c) + (padding_width * (c + 1));
				console.log("box_width", box_width);
				console.log("left", left);

				var top = ((r * box_height) + (r + 1) * padding_height);

				model.set({
					position_top: top,
					position_left: left,
					width: box_width
				});
			});
		},
		hideModels: function() {
			this.each(function(model) {
				model.hide();
			});
		},
		restoreModels: function() {
			var original_models = this.original_models.models;
			this.reset(original_models);
			this.filtered = false;
		},
		showHiddenModels: function() {
			this.restoreModels();
			this.determineLocation();
			this.each(function(model) {
				model.show();
			});
		},
		sortModels: function(field) {
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

	FlipCard.CardsView = Backbone.View.extend({
		id: 'cards',
		render: function() {

			this.renderedViews = [];

			this.collection.each(function(card) {
				var new_card = new FlipCard.CardView({
					model: card
				});
				this.renderedViews.push(new_card.render().el);
			}, this);

			this.$el.append(this.renderedViews);

			return this;
		}
	});

	FlipCard.FilterView = Backbone.View.extend({
		template: _.template($("#filter-template").html()),
		render: function() {
			$(this.el).html(this.template({}));
			return this;
		},
		events: {
			"click .filter": "filter",
			"click .sort": "sort",
			"keyup #search": "search"
		},
		filter: function(event) {
			event.preventDefault();
			var filterfield = $(event.target).data('filtercategory');
			if (filterfield == "all") {
				this.collection.showHiddenModels();
			} else {
				this.collection.filterCards("category", filterfield);
			}
		},
		sort: function(event) {
			event.preventDefault();
			var sortfield = $(event.target).data('sortfield');
			if (sortfield) {
				this.collection.sortModels(sortfield);
			}
		},
		search: function(event) {
			event.preventDefault();
			var letters = $("#search").val();
			this.collection.filterCards("title", letters);
		}
	});

	FlipCard.CardView = Backbone.View.extend({
		tagName: 'div',
		className: 'card',
		template: _.template($("#card-template").html()),
		initialize: function() {
			this.model.on('change', this.render, this);
		},
		render: function() {
			this.$el.css('top', this.model.get("position_top"));
			this.$el.css('left', this.model.get("position_left"));
			this.$el.css('width', this.model.get("width"));

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
		flipCard: function(event) {
			var $card = $(event.currentTarget);

			if ($card.hasClass('flip')) {
				$card.removeClass('flip');
			} else {
				$card.addClass('flip');
			}
		}
	});

	FlipCard.AppView = Backbone.View.extend({
		start: function() {
			this.cards = new FlipCard.Cards();

			this.cards.add(FlipCard.data);
			this.cards.determineLocation();

			this.cardsview = new FlipCard.CardsView({
				collection: this.cards
			});
			$("#content").append(this.cardsview.render().el);

			this.filterview = new FlipCard.FilterView({
				collection: this.cards
			});
			$("#filters").append(this.filterview.render().el);
		}
	});


	var appview = new FlipCard.AppView();
	appview.start();

});