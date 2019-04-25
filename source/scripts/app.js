'use strict';

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
        var $msg = $('.message');
        suits.push(new Suit('spades', 'black', '&spades;'));
        suits.push(new Suit('hearts', 'red', '&hearts;'));
        suits.push(new Suit('clubs', 'black', '&clubs;'));
        suits.push(new Suit('diamonds', 'red', '&diams;'));

        cards = makeCards(suits);

        step('human');
        step('computer');
        step('human');

        $msg.addClass('hide');

        $('.click').click(function() {
            step('human');
        });

        $('.stop').click(function() {
            $('.click').hide();
            $('.stop').hide();
            cpu();
        });

        $('.restart').click(restart);

        $(document.body).on('showMessage', function(e, isWinner) {
            $msg.removeClass('hide');
            $msg.find('p').text(isWinner ? 'You Won!' : 'You Loose!');
        });
    }

    function isWinner() {
        return (
            result['human'] <= 21 &&
            (result['human'] > result['computer'] || result['computer'] > 21)
        );
    }

    function restart() {
        for(var el in result) {
            result[el] = 0;
        }
        $('.message').addClass('hide');
        $('body').find('.card').remove();
        $('.score').text(0);
        $('.click').show();
        $('.stop').show();
        cards = makeCards(suits);

        step('human');
        step('computer');
        step('human');
    }

    function makeCards(suits) {
        var cards = [];
        var card = null;

        suits.forEach(function(suite) {
            for(var i = 2; i <= 14; i++) {
                card = new Card(i.toString(), i, i, suite);

                switch (i) {
                    case 11:
                        card.name = 'j';
                        card.points = 10;
                        break;
                    case 12:
                        card.name = 'd';
                        card.points = 10;
                        break;
                    case 13:
                        card.name = 'k';
                        card.points = 10;
                        break;
                    case 14:
                        card.name = 'a';
                        card.points = 11;
                        break;
                }

                cards.push(card);
            }
        });

        return cards;
    }

    function printCard(cards, index, $to) {
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

    function randomIndex() {
        return Math.floor(Math.random() * cards.length);
    }

    function step(player) {
        try {
            result[player] += printCard(cards, randomIndex(), $('.' + player));
            $('.' + player + ' .score').text(result[player]);

            if(result[player] > 21) {
                $('.click').hide();
                $('.stop').hide();
                $(document.body).trigger('showMessage', isWinner());
            }
        } catch (e) {
            cards = makeCards(suits);
        }
    }

    function cpu() {
        var timer = setInterval(function() {
            step('computer');

            if (result['computer'] >= 20 || result['computer'] >= result['human']) {
                clearInterval(timer);
                $(document.body).trigger('showMessage', isWinner());
            };
        }, 500);
    }

    gameInit();

})();