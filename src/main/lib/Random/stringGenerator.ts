const stringGenerator = async (preText: string): Promise<string> => {
  return `${preText}${Math.random() * (99999 - 1) + 1}`
}

export default stringGenerator
