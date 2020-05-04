

const filterAcadamies = props => {
  const { batteryJson } = props;

  const serailNumData = getSerailNumData(batteryJson);
  const academyArray = getAcademyArray(serailNumData)

  return sortByBatteryUsage(academyArray);
}

//return json object with keys as battery serial number and value as object with all battery details
const getSerailNumData = data => {
  console.log(data)
  return data.reduce((acc, curr) => {
    const serialNum = curr.serialNumber;
    if (acc[serialNum] !== undefined) {
      let serialNumObj = acc[serialNum];
      serialNumObj['objs'].push(curr);
      let batteryDetails = insertCurrObjInSortedOrder(serialNumObj['batteryDetails'], getBatteryDetails(curr));
      serialNumObj['batteryDetails'] = batteryDetails;
      acc[serialNum] = serialNumObj;
      return acc;
    } else {
      return acc = {
        ...acc,
        [serialNum]: {
          'academyId': curr.academyId,
          'serialNumber': curr.serialNumber,
          'objs': [curr],
          'batteryDetails': [getBatteryDetails(curr)]
        }
      }
    }
  }, {});
}

//return neccesary obj details for fuurefuture usage,.
const getBatteryDetails = obj => {
  return {
    'timestamp': obj.timestamp,
    'batteryLevel': obj.batteryLevel,
    'timestampMilli': new Date(obj.timestamp).getTime()
  }
}

//Compare the object with each object in array and insert at proper place
const insertCurrObjInSortedOrder = (data, obj) => {
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      if (obj.timestampMilli < data[0].timestampMilli)
        data.unshift(obj);
      else
        data.push(obj);
      break;
    } else if ((i + 1) === data.length) {
      data.push(obj)
      break;
    } else {
      if (obj.timestampMilli < data[i].timestampMilli) {
        data.splice((i - 1), 0, obj);
        break;
      } else if (obj.timestampMilli > data[i].timestampMilli && obj.timestampMilli < data[i + 1].timestampMilli) {
        data.splice(i, 0, obj)
        break;
      }
    }
  }
  return data;
}

//Generate Academy array from batterySerialNumber object
const getAcademyArray = data => {
  let uniqueAcademies = [];
  let academyArray = [];
  for (var batteryObj in data) {
    const batteryLife = getBatteryLife(data[batteryObj]['batteryDetails'])
    data[batteryObj]['batteryLife'] = batteryLife;

    if (!uniqueAcademies.includes(data[batteryObj]['academyId'])) {
      uniqueAcademies.push(data[batteryObj]['academyId'])
      academyArray.push({
        academyId: data[batteryObj]['academyId'],
        deviceDetails: [{ 'serialNumber': data[batteryObj]['serialNumber'], 'batteryLife': batteryLife }],
        redZone: data[batteryObj]['batteryLife'] > 30 ? 1 : 0,
        orangeZone: (data[batteryObj]['batteryLife'] > 15 && data[batteryObj]['batteryLife'] < 30) ? 1 : 0,
        greenZone: data[batteryObj]['batteryLife'] < 15 ? 1 : 0,
        academyName: `Academy ${academyArray.length+1}`
      })
    } else {
      let academyObj = academyArray[uniqueAcademies.indexOf(data[batteryObj]['academyId'])];
      academyObj.deviceDetails.push({
        'serialNumber': data[batteryObj]['serialNumber'], 'batteryLife': batteryLife
      })
      if (batteryLife > 30) {
        ++academyObj.redZone
      } else if (batteryLife > 15 && batteryLife < 30) {
        ++academyObj.orangeZone
      } else if (batteryLife < 15) {
        ++academyObj.greenZone
      }
      academyArray[uniqueAcademies.indexOf(data[batteryObj]['academyId'])] = academyObj;
    }
  }

  return academyArray;
}

//calculate the battery life of each battery
const getBatteryLife = data => {
  if (data.length === 1) {
    return data[0].batteryLevel
  }
  let avgHrs = [];
  let subArray = [];
  for (let i = 0; i < data.length; i++) {
    if (subArray.length === 0) {
      subArray.push(data[i]);
    } else if (((i + 1) === data.length) || (data[i].batteryLevel < data[i + 1].batteryLevel)) {
      subArray.push(data[i])
      const diffInHours = Math.round((subArray[1].timestampMilli - subArray[0].timestampMilli) / 3600000);
      if (diffInHours > 1) {
        const batteryDropPerDay = ((subArray[0].batteryLevel - subArray[1].batteryLevel) / diffInHours) * 24;
        avgHrs.push(batteryDropPerDay)
      }
      subArray = [];
    }
  }
  return Math.abs(avgHrs.reduce((a, c) => (a + c)) / avgHrs.length) * 100;
}

//Sorts the arry based on number of devices redZone, orangeZone and greenZone
const sortByBatteryUsage = data => {
  return data.sort((a, b) => {
    if (a.redZone === b.redZone) {
      if (a.orangeZone === b.orangeZone) {
        return b.greenZone - a.greenZone
      } else {
        return b.orangeZone - a.orangeZone
      }
    } else {
      return b.redZone - a.redZone;
    }
  })
}


export {filterAcadamies, getSerailNumData, insertCurrObjInSortedOrder, getBatteryDetails, getAcademyArray, getBatteryLife, sortByBatteryUsage };