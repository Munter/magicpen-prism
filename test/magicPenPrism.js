var expect = require('unexpected'),
    magicPenPrism = require('../lib/magicPenPrism'),
    MagicPen = require('magicpen');

describe('magicpen-prism', function () {
    var magicPen;
    beforeEach(function () {
        magicPen = new MagicPen().installPlugin(magicPenPrism);
    });

    it('should highlight JavaScript', function () {
        expect(
            magicPen.code('var foo = "bar";', 'javascript').toString('ansi'),
            'to equal',
            '\u001b[90m\u001b[38;5;74mvar\u001b[39m foo \u001b[90m\u001b[38;5;180m=\u001b[39m \u001b[32m\u001b[38;5;112m"bar"\u001b[39m\u001b[90m\u001b[38;5;247m;\u001b[39m'
        );
    });

    it('should format a multiline JavaScript chunk', function () {
        expect(
            magicPen.code('var foo = "bar",\n    quux = "baz";', 'javascript').toString(),
            'to equal',
            'var foo = "bar",\n    quux = "baz";'
        );
    });

    it('should not touch an unsupported language', function () {
        expect(
            magicPen.code('var foo = "bar";', 'foobar').toString('ansi'),
            'to equal',
            'var foo = "bar";'
        );
    });

    it('should highlight C code (using internal mapping)', function () {
        expect(
            magicPen.code('int main(int argc, char **argv) {}', 'c').toString('ansi'),
            'to equal',
            'int \u001b[31m\u001b[38;5;204mmain\u001b[39m\u001b[90m\u001b[38;5;247m(\u001b[39mint argc\u001b[90m\u001b[38;5;247m,\u001b[39m char \u001b[90m\u001b[38;5;180m**\u001b[39margv\u001b[90m\u001b[38;5;247m)\u001b[39m \u001b[90m\u001b[38;5;247m{}\u001b[39m'
        );
    });
});
