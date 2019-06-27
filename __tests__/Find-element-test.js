import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


let findElement = function(tree, element){
    let result = undefined;

    for(node in tree.children)
    {
        if(tree.children[node].props.testID == element)
        {
            result =true;
        }
    }

    return result;
}

it('find element', () => {

let tree = renderer.create(
    <App/>
).toJSON();

expect(findElement(tree,"buttonArea")).toBeDefined();


})