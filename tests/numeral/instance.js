var numeral = require('../../numeral.js'),
  languageDa = require('../../languages/da-dk'),
  languageNl = require('../../languages/nl-nl');

numeral.language('nl-nl', languageNl);
numeral.language('da-dk', languageDa);

exports.instance = {
  default: function (test) {
    test.strictEqual(numeral.language(), 'en', 'Expected "en"');
    test.done();
  },
  changeLangSingleInstance: function (test) {
    test.strictEqual(numeral.language(), 'en', 'Expected "en"');
    numeral.language('nl-nl');
    test.strictEqual(numeral.language(), 'nl-nl', 'Expected "nl-nl"');
    numeral.language('en');
    test.done();
  },
  changeLangMultipleInstances: function (test) {
    /* Create two independent instances of numeral with different locales */
    var danishInstance = numeral.createInstance().language("da-dk");
    var dutchInstance = numeral.createInstance().language("nl-nl");
    
    /* Test if the proper languages are returned */
    test.strictEqual(numeral.language(), 'en', 'Expected "en"');
    test.strictEqual(danishInstance.language(), 'da-dk', 'Expected "da-dk"');
    test.strictEqual(dutchInstance.language(), 'nl-nl', 'Expected "nl-nl"');
    
    /* Let's change the global lang and see it doesn't influence the instances */
    numeral.language('nl-nl');
    test.strictEqual(numeral.language(), 'nl-nl', 'Expected "nl-nl"');
    test.strictEqual(danishInstance.language(), 'da-dk', 'Expected "da-dk"');
    test.strictEqual(dutchInstance.language(), 'nl-nl', 'Expected "nl-nl"');
    
    /* Also check if the formats for the different languages (locales) are applied properly */
    numeral.language('en');
    test.strictEqual(numeral(101).format("$ 1.00"), '$ 101.00', 'Expected "nl-nl"');
    test.strictEqual(danishInstance(102).format("$ 1.00"), 'DKK 102,00', 'Expected "da-dk"');
    test.strictEqual(dutchInstance(103).format("$1.00"), '€ 103,00', 'Expected "nl-nl"');
    test.done();
  }
};
