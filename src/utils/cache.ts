class CustomCache {
  private caches = new Map();
  add<V> (key: string, value: V, expire = 0): void {
    this.caches.set(key, {
      value,
      timestamp: Date.now(),
      cacheTime: expire
    })
  }

  get<V> (key: string): V | undefined {
    const now = Date.now()
    const cacheValue = this.caches.get(key)
    let result: V | undefined
    if (cacheValue) {
      const diff = Math.ceil((now - cacheValue.timestamp) / 1000)
      if (cacheValue.cacheTime === 0) {
        result = cacheValue.value
      } else if (diff < cacheValue.cacheTime) {
        result = cacheValue.value
      }
    }
    return result
  }

  del (key?: string): void {
    if (key) {
      this.caches.delete(key)
    } else {
      this.caches = new Map()
    }
  }
}
const cache = new CustomCache()
cache.add('cddf591e-4d64-4dfb-aa9b-71b91d45e76c', {
  id: 5,
  admin: 'admin',
  password: '21232f297a57a5a743894a0e4a801fc3',
  mail: 'lupkcd@outlook.com'
})
export default cache
