export const simpleStringify = (object: any) => {
  var simpleObject: any = {};

  for (var prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof object[prop] == "object") {
      continue;
    }
    if (typeof object[prop] == "function") {
      continue;
    }
    simpleObject[prop] = object[prop];
  }

  return JSON.stringify(simpleObject); // returns cleaned up JSON
};
