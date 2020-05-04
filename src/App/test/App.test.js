import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './../App'

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />)
  if (state) wrapper.setState(state);
  return wrapper;
}

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('When using App Component', () => {
  it('App Component Should be defined', () => {
    const wrapper = setup();
    expect(wrapper.find('App')).toBeDefined()
  })

  it('Should have one h1 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('h1')).toHaveLength(1);
  })

 it('App Component Should have one h2 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('h2')).toHaveLength(1);
  })

})