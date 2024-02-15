function coordPairInArray(coordPair, arr) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][0] === coordPair[0] && arr[i][1] === coordPair[1]) {
      return true;
    }
  }

  return false;
}

export default coordPairInArray;