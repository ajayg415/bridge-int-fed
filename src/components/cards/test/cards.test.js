import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Cards from './../cards'

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = defauleProps, state = null) => {
  const wrapper = shallow(<Cards {...props} />)
  if (state) wrapper.setState(state);
  return wrapper;
}

const defauleProps = {
  "cardData": {
    "academyId": 30015,
    "redZone": 5,
    "orangeZone": 3,
    "greenZone": 3,
    "academyName": "Academy 4"
  }
}


describe('When using Cards Component', () => {
  it('Cards Component Should be defined',() => {
    const wrapper = setup();
    expect(wrapper.find('Cards')).toBeDefined();
  })

  it('Should have one h5 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('h5')).toHaveLength(1);
  })

  it('Should have two h6 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('h6')).toHaveLength(2);
  })

  it('Should have 5 red zone devices',() => {
    const wrapper = setup();
    expect(wrapper.find('.red-zone').text()).toEqual('5')
  })

  it('Should have 8 red zone devices',() => {
    const wrapper = setup({
      "cardData": {
        "academyId": 30015,
        "redZone": 8,
        "orangeZone": 3,
        "greenZone": 3,
        "academyName": "Academy 4"
      }
    });
    expect(wrapper.find('.red-zone').text()).toEqual('8')
  })
})
