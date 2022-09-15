async function sleep(ms = 300) {
  return new Promise((res, rej) => {
    try {
      setTimeout(res, ms)
    } catch (e) {
      console.log(e)
      res()
    }
  })
}

export { sleep }
