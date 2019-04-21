export interface ILinphoneConfig {
    host: string;
    password: string;
    port: number;
    rtpPort: number;
    sip: number;
    technology: string;
    configDir?: string;
    file?: string;
}
