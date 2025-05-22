const isDebugMode = import.meta.env.MODE === 'development';

export const debug = (namespace: string, ...args: unknown[]) => {
  if (!isDebugMode) return;
  console.log(`[debug:${namespace}]`, ...args);
};
