(function() {
    //cards game
    //black jack

    var suits = [];
    var cards = null;

    var result = {
        computer: 0,
        human:0
    };

    function Suit(name, color, symbol) {
        this.name = name;
        this.color = color;
        this.symbol = symbol;
    };

    function Card(name, weight, points, suit) {
        this.name = name;
        this.weight = weight;
        this.points = points;
        this.suit = suit;
    }

    Card.prototype = new Suit();

    var gameInit = function() {
        suits.push(new Suit('spades', 'black', '&spades;'));
        suits.push(new Suit('hearts', 'red', '&hearts;'));
        suits.push(new Suit('clubs', 'black', '&clubs;'));
        suits.push(new Suit('diamonds', 'red', '&diams;'));

        cards = makeCards(suits);

        step('human');
        step('computer');
        step('human');

        $('.click').click(function() {
            step('human');
        });

        $('.stop').click(function() {
            $('.click').hide();
            $('.stop').hide();
            cpu();
        });

        $('.restart').click(function() {
            restart();
        });
    }

    var restart = function() {
        for(var el in result) {
            result[el] = 0;
        }
        $('body').find('.card').remove();
        $('.score').text(0);
        $('.click').show();
        $('.stop').show();
        cards = makeCards(suits);

        step('human');
        step('computer');
        step('human');
    }

    var makeCards = function(suits) {
        var cards = [];
        var card = null;
        for(var el in suits) {
            for(var i = 2; i <= 14; i++) {
                card = new Card(i.toString(), i, i, suits[el]);
                if(i === 11) {
                    card.name = 'j';
                    card.points = 10;
                } else if(i === 12) {
                    card.name = 'd';
                    card.points = 10;
                } else if(i === 13) {
                    card.name = 'k';
                    card.points = 10;
                } else if(i === 14) {
                    card.name = 'a';
                    card.points = 11;
                }

                cards.push(card);
            }
        }
        return cards;
    }

    var printCard = function(cards, index, $to) {
        var points = cards[index].points;
        var $template = $('<div class="card ' + cards[index].suit.color + '">' +
        '<div class="corners left_corner">' +
            '<span>' + cards[index].name + '</span>' +
            '<span>' + cards[index].suit.symbol + '</span>' +
        '</div>' +
        '<div class="suit">' + cards[index].suit.symbol + '</div>' +
        '<div class="corners right_corner">' +
            '<span>' + cards[index].name + '</span>' +
            '<span>' + cards[index].suit.symbol + '</span>' +
        '</div>' +
        '</div>');

        $to.append($template);
        delete cards[index];
        cards.splice(index, 1);

        return points;
    }

    var randomIndex = function() {
        return Math.floor(Math.random() * cards.length);
    }

    var step = function(player) {
        try {
            result[player] += printCard(cards, randomIndex(), $('.' + player));
            $('.' + player + ' .score').text(result[player]);

            if(result[player] > 21) {
                $('.click').hide();
                $('.stop').hide();
            }
        } catch (e) {
            cards = makeCards(suits);
        }
    }

    var cpu = function() {
        var timer = setInterval(function() {
            step('computer');
            if(result['computer'] >= 20 || result['computer'] >= result['human']) clearInterval(timer);
        }, 500);
    }

    gameInit();

})();