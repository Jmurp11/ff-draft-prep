export function _filter<T>(source: T[], filterOnProperty: string, value: any): T[] {
  let filterValue = null;
  if (typeof value === 'string') {
    filterValue = value.toLowerCase();
  } else {
    filterValue = value;
  }

  return source.filter(item => {
    if (typeof item[filterOnProperty] === 'string') {
      return (item[filterOnProperty] as string).toLowerCase().includes(filterValue);
    } else {
      return String(item[filterOnProperty]).includes(String(filterValue));
    }
  });
}

export function findItemWithPropertyValue<T>(source: T[], propertyName: string, searchFor: string): T | void {
  if (searchFor) {
    return source.find(item => {
      if (typeof item[propertyName] === 'string') {
        return (item[propertyName] as string).toLowerCase() === searchFor.toLowerCase();
      } else {
        return item[propertyName] === searchFor;
      }
    });
  }
}
