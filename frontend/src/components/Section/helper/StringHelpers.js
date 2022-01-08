const StringToColor = (stringColorTransformation) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < stringColorTransformation.length; i += 1) {
    hash = stringColorTransformation.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  /* eslint-enable no-bitwise */
  return color;
};

export const CapitalizeFirstLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const StringAvatar = (name) => {
  if (name == undefined || name == "") {
    name = "John Doe";
  }

  const nameSplit = name.split(" ");

  let children = "";

  if (nameSplit.length == 1) {
    children = nameSplit[0][0].toUpperCase();
  } else {
    children = `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`.toUpperCase();
  }

  return {
    sx: {
      bgcolor: StringToColor(name),
    },
    children: children,
  };
};
