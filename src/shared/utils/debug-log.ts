const isDebugMode = import.meta.env.MODE === 'dev';

export const debug = (namespace: string, ...args: unknown[]) => {
  if (!isDebugMode) return;
  console.log(`[debug:${namespace}]`, ...args);
};
