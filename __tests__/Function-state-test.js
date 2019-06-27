import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


it('function and state test cases', () =>{

let appInstance = renderer.create( <App/>).getInstance();

appInstance.buttonIsPressed("54+3435-25454*34/3");
expect(appInstance.state.resultText).toEqual("54+3435-25454*34/3");

expect(appInstance.parseCalculationString("54+3435-25454*34/3")).toEqual([ 54, '+', 3435, '-', 25454, '*', 34, '/', 3 ]);

expect(appInstance.calculate([ 54, '+', 3435, '-', 25454, '*', 34, '/', 3 ])).toEqual("-330440");





})