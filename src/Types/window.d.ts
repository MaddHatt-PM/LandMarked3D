declare global {
  interface Window {
    api: {
      request: (params: any) => void;
    };
  }
}

export {};