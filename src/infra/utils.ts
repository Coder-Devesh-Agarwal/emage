function createResourceName(suffix: string): string {
  return `${process.env.NAME}_${suffix}-gll`;
}

export { createResourceName };
