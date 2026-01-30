
    export type RemoteKeys = 'mfe_dashboard/Routes';
    type PackageType<T> = T extends 'mfe_dashboard/Routes' ? typeof import('mfe_dashboard/Routes') :any;