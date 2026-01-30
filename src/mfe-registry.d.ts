export interface MfeApp {
  name: string;
  title: string;
  route: string;
  port: number;
  path: string;
}

declare const mfe_registry: {
  mfe_apps: MfeApp[];
};

export default mfe_registry;
