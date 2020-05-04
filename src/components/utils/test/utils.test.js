import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import { filterAcadamies, getSerailNumData, insertCurrObjInSortedOrder, getBatteryDetails, getAcademyArray, getBatteryLife, sortByBatteryUsage } from './../utils'

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = { batteryJson: defaultProps }, state = null) => {
  const wrapper = shallow(<utils {...props} />)
  if (state) wrapper.setState(state);
  return wrapper;
}

const defaultProps = [{
  "academyId": 30006,
  "batteryLevel": 0.68,
  "employeeId": "T1007384",
  "serialNumber": "1805C67HD02259",
  "timestamp": "2019-05-17T07:47:25.833+01:00"
}, {
  "academyId": 30006,
  "batteryLevel": 0.51,
  "employeeId": "T1001417",
  "serialNumber": "1805C67HD02332",
  "timestamp": "2019-05-17T07:48:49.147+01:00"
}]

const serialNumberData = {
  "1805C67HD02259": { "academyId": 30006, "serialNumber": "1805C67HD02259", "objs": [{ "academyId": 30006, "batteryLevel": 0.68, "employeeId": "T1007384", "serialNumber": "1805C67HD02259", "timestamp": "2019-05-17T07:47:25.833+01:00" }], "batteryDetails": [{ "timestamp": "2019-05-17T07:47:25.833+01:00", "batteryLevel": 0.68, "timestampMilli": 1558075645833 }] },
  "1805C67HD02332": { "academyId": 30006, "serialNumber": "1805C67HD02332", "objs": [{ "academyId": 30006, "batteryLevel": 0.51, "employeeId": "T1001417", "serialNumber": "1805C67HD02332", "timestamp": "2019-05-17T07:48:49.147+01:00" }], "batteryDetails": [{ "timestamp": "2019-05-17T07:48:49.147+01:00", "batteryLevel": 0.51, "timestampMilli": 1558075729147 }] }
}

const sameBattery = [{
  "batteryLevel": 0.68,
  "timestamp": "2019-05-17T07:47:25.833+01:00",
  "timestampMilli": 1558075645833
},
{
  "batteryLevel": 0.65,
  "timestamp": "2019-05-17T11:47:25.833+01:00",
  "timestampMilli": 1558090045833
},
{
  "batteryLevel": 0.60,
  "timestamp": "2019-05-16T07:47:25.833+01:00",
  "timestampMilli": 1557989245833
}]

describe('When using util library', () => {

  describe('When using filterAcadamies', () => {
    it('filterAcadamies should be defined', () => {
      expect(filterAcadamies).toBeDefined();
    })
  })

  describe('When using getSerailNumData', () => {
    it('getSerailNumData should be defined', () => {
      expect(getSerailNumData).toBeDefined();
    })

    it('getSerailNumData should return proper value', () => {
      const modifiedObjs = getSerailNumData(defaultProps)
      expect(modifiedObjs).toEqual(serialNumberData)
    })

  })

  describe('When using getBatteryDetails', () => {
    it('getBatteryDetails should be defined', () => {
      expect(getBatteryDetails).toBeDefined();
    })

    it('getBatteryDetails should return proper value', () => {
      const modifiedObj = getBatteryDetails(defaultProps[0])
      expect(modifiedObj).toEqual({ "timestamp": "2019-05-17T07:47:25.833+01:00", "batteryLevel": 0.68, "timestampMilli": 1558075645833 })
    })
  })

  describe('When using insertCurrObjInSortedOrder', () => {
    it('insertCurrObjInSortedOrder should be defined', () => {
      expect(insertCurrObjInSortedOrder).toBeDefined();
    })

    it('insertCurrObjInSortedOrder behaviour when we have 2 objects', () => {
      let modifiedObjs = insertCurrObjInSortedOrder([sameBattery[0]], sameBattery[1])
      expect(modifiedObjs).toEqual([{"timestamp":"2019-05-17T07:47:25.833+01:00","batteryLevel":0.68,"timestampMilli":1558075645833},{"timestamp":"2019-05-17T11:47:25.833+01:00","batteryLevel":0.65,"timestampMilli":1558090045833}]);
    })

    it('insertCurrObjInSortedOrder behaviour when we have 3 objects', () => {
      let modifiedObjs = insertCurrObjInSortedOrder(sameBattery.slice(0,2), sameBattery[2])
      expect(modifiedObjs).toEqual([{"timestamp":"2019-05-16T07:47:25.833+01:00","batteryLevel":0.6,"timestampMilli":1557989245833},{"timestamp":"2019-05-17T07:47:25.833+01:00","batteryLevel":0.68,"timestampMilli":1558075645833},{"timestamp":"2019-05-17T11:47:25.833+01:00","batteryLevel":0.65,"timestampMilli":1558090045833}])
    })
  })

  describe('When using getAcademyArray', () => {
    it('getAcademyArray should be defined', () => {
      expect(getAcademyArray).toBeDefined();
    })

    it('getAcademyArray should return correct value', () => {
      let modifiedObj = getAcademyArray(serialNumberData);
      expect(modifiedObj).toEqual([{"academyId":30006,"deviceDetails":[{"serialNumber":"1805C67HD02259","batteryLife":0.68},{"serialNumber":"1805C67HD02332","batteryLife":0.51}],"redZone":0,"orangeZone":0,"greenZone":2,"academyName":"Academy 1"}])
    })
  })

  describe('When using getBatteryLife', () => {
    it('getBatteryLife should be defined', () => {
      expect(getBatteryLife).toBeDefined()
    })

    it('when getBatteryLife have only one object', () => {
      let modifiedObj = getBatteryLife([sameBattery[0]])
      expect(modifiedObj).toEqual(sameBattery[0].batteryLevel)
    })
  })

  describe('When using sortByBatteryUsage', () => {
    it('sortByBatteryUsage should be defined', () => {
      expect(sortByBatteryUsage).toBeDefined();
    })
  })

})