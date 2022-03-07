export const getPathName = (path = "", ...paths) =>
  `${path}${path.charAt(path.length - 1) === "/" ? "" : "/"}${paths.join("/")}`;
