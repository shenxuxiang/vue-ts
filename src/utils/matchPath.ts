import { pathToRegexp } from 'path-to-regexp';
import type { Key } from 'path-to-regexp';

const MAP_CACHE = new Map<string, { reg: RegExp; paramNames: Key[] }>();

export default function matchPath(path: string, pathname: string, options = {}): [RegExpExecArray, Key[]] | null {
  const cache = MAP_CACHE.get(path);
  let reg: RegExp;
  let paramNames: Key[] = [];

  if (cache?.reg) {
    reg = cache.reg;
    paramNames = cache.paramNames;
  } else {
    reg = pathToRegexp(path, paramNames, options);
    MAP_CACHE.set(path, { reg, paramNames });
  }
  const matched = reg.exec(pathname);
  return matched ? [matched, paramNames] : null;
}
