$(document).ready(function () {

    $('#leasetable td>span').tooltip();
    $('#amount').focus();


    ko.extenders.minValue = function(target, overrideMessage) {
        //add some sub-observables to our observable
        target.hasError = ko.observable();
        target.validationMessage = ko.observable();

        //define a function to do validation
        function validate(newValue) {
           target.hasError(newValue > 1000 ? false : true);
           target.validationMessage(newValue ? "" : overrideMessage || "Must be at least 1000");
        }

        //initial validation
        validate(target());

        //validate whenever the value changes
        target.subscribe(validate);

        //return the original observable
        return target;
    };



   var LeasingModel = function(initialAmount) {
    var self = this;


    var minExVAT = 1000;

    self.minAllowed = minExVAT;
    self.maxAllowed = 25000;

    self.calculateTo2dp = function(amount, multiplier) {
        var result = amount * multiplier;
        return result.toFixed(2);
    };

    self.amountToFinance = ko.observable(initialAmount ? initialAmount : self.minAllowed).extend({ minValue: ""});

    self.monthlyRental2yrs = ko.computed(function() {
                                            return self.calculateTo2dp(self.amountToFinance(), 0.04738);
                                        }, this);
    self.monthlyRental3yrs = ko.computed(function() {
                                            return self.calculateTo2dp(self.amountToFinance(), 0.0335);
                                        }, this);
    self.monthlyRental4yrs = ko.computed(function() {
                                            return self.calculateTo2dp(self.amountToFinance(), 0.02592);
                                        }, this);
    self.monthlyRental5yrs = ko.computed(function() {
                                            return self.calculateTo2dp(self.amountToFinance(), 0.02167);
                                        }, this);

  };



  ko.applyBindings(new LeasingModel());
});


