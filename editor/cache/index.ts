import LRU from "lru-cache";

// At least one of 'max', 'ttl', or 'maxSize' is required, to prevent
// unsafe unbounded storage.
//
// In most cases, it's best to specify a max for performance, so all
// the required memory allocation is done up-front.
//
// All the other options are optional, see the sections below for
// documentation on what each one does.  Most of them can be
// overridden for specific items in get()/set()
// See https://www.npmjs.com/package/lru-cache for more information
const options = {
  max: 500,
};

const lruCache = new LRU(options);

export default lruCache;
