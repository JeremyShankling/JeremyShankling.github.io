var app = angular
        .module('GradeCalculationApp', []);

app.filter('percentage', ['$filter', function ($filter) {
    return function (input, decimals) {
        return $filter('number')(input * 100, decimals) + '%';
    };
}]);

app.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9\.]/g, '');

                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});

app.controller('GradeCalculationController', function ($scope) {
    $scope.AssignmentCalculated = 0;
    $scope.QuizCalculated = 0;
    $scope.TestCalculated = 0;
    $scope.MiscCalculated = 0;

    $scope.Assignment = {
        'score': {
            'TotalScore': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'TotalPoints': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        'NumberOf': 0,
        'Worth': 0,
        'TotalCalculated': 0,
        'Title': 'Assignments'
    };
    $scope.Quiz = {
        'score': {
            'TotalScore': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'TotalPoints': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        'NumberOf': 0,
        'Worth': 0,
        'TotalCalculated': 0,
        'Title': 'Quizzes'
    };
    $scope.Test = {
        'score': {
            'TotalScore': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'TotalPoints': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        'NumberOf': 0,
        'Worth': 0,
        'TotalCalculated': 0,
        'Title': 'Exams'
    };
    $scope.Misc = {
        'score': {
            'TotalScore': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'TotalPoints': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        'NumberOf': 0,
        'Worth': 0,
        'TotalCalculated': 0,
        'Title': 'Misc'
    };

    $scope.allObjects = [$scope.Assignment, $scope.Quiz, $scope.Test, $scope.Misc]
    $scope.isNumber = function (textObj) {
        var newValue = textObj;
        var newLength = newValue.length;
        for (var i = 0; i < newLength; i++) {
            aChar = newValue.substring(i, i + 1)
            if ((aChar < "0" || aChar > "9") && (aChar != ".")) {
                return false
            }
        }
        return true
    }

    $scope.parseFloat = function (value) {
        return parseFloat(value);
    }

    $scope.calcObject = function (object) {
        var allScores = 0;
        var allTotals = 0;
        //alert($scope.Assignment.score.TotalScore.length)
        for (i = 0; i < $scope.Assignment.score.TotalScore.length; i++) {
            //wrapped with "(+) to ensure it sees it as numeric value"
            allScores += +($scope.Assignment.score.TotalScore[i]);
            allTotals += +($scope.Assignment.score.TotalPoints[i]);
        }
        allScores = +(allScores)
        allTotals = +(allTotals)

        if (allTotals == 0) {
            object.TotalCalculated = 0;
        }
        else {
            object.TotalCalculated = +((allScores / allTotals).toFixed(2))
        }

    }

    $scope.calcQuiz = function () {
        var allScores = 0;
        var allTotals = 0;
        //alert($scope.Assignment.score.TotalScore.length)
        for (i = 0; i < $scope.Quiz.score.TotalScore.length; i++) {
            //wrapped with "(+) to ensure it sees it as numeric value"
            allScores += +($scope.Quiz.score.TotalScore[i]);
            allTotals += +($scope.Quiz.score.TotalPoints[i]);
        }
        allScores = +(allScores)
        allTotals = +(allTotals)

        if (allTotals == 0) {
            $scope.QuizCalculated = 0;
        }
        else {
            $scope.QuizCalculated = +((allScores / allTotals).toFixed(2))
        }

    }

    //$scope.calculcation = function () {
    //    var assignmentPercent = 0;
    //    var quizPercent = 0;
    //    var testPercent = 0;
    //    var miscPercent = 0;

    //    for (i = 0 ; i < this.Assignment.length; i++) {
    //        assignmentPercent += this.Assignment[i];
    //    }
    //    for (i = 0 ; i < this.Quiz.length; i++) {
    //        quizPercent += this.Quiz[i];
    //    }
    //    for (i = 0 ; i < this.Test.length; i++) {
    //        testPercent += this.Test[i];
    //    }
    //    for (i = 0 ; i < this.Misc.length; i++) {
    //        miscPercent += this.Misc[i];
    //    }

    //    assignmentPercent = ($scope.Assignment / $scope.AssignmentTotal) * $scope.AssignmentWorth
    //    quizPercent = ($scope.Quiz / $scope.QuizTotal) * $scope.QuizWorth
    //    testPercent = ($scope.Test / $scope.AssignmentTotal) * $scope.TestWorth
    //    miscPercent = ($scope.Misc / $scope.MiscTotal) * $scope.MiscWorth


    //    return (assignmentPercent + quizPercent + testPercent + miscPercent) / this.total
    //}

});

