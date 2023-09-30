export function getNum(str, position) {
  const arr = str.split('');
  let result = '';
  arr.forEach((item) => {
    if (!isNaN(item) || item === 'Y') result += item;
  });
  result = result.trim();
  const onlyNumbArr = result.split('Y');
  if (position === 'left') {
    return +onlyNumbArr[0];
  } if (position === 'right') {
    return +onlyNumbArr[1];
  }
}
