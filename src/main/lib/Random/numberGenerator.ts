const numberGenerator = (): number => {
  return parseInt(`${Math.random() * (999999 - 1) + 1}`)
}

export default numberGenerator
