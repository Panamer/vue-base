module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractcss: !isDev,
  }
}