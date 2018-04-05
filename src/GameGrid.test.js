import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

configure(new Adapter());

describe('GameGrid', function() {
  test('it should render tiles', function() {
    expect(true).toEqual(true);
  });
});
