import { Protobuf } from "@meshtastic/core";
import { z } from "zod/v4";

const AddressModeEnum = z.enum(
  Protobuf.Config.Config_NetworkConfig_AddressMode,
);
const ProtocolFlagsEnum = z.enum(
  Protobuf.Config.Config_NetworkConfig_ProtocolFlags,
);
const WiFiModeEnum = z.enum(
  Protobuf.Config.Config_NetworkConfig_WiFiMode,
);

export const NetworkValidationIpV4ConfigSchema = z.object({
  ip: z.ipv4(),
  gateway: z.ipv4(),
  subnet: z.ipv4(),
  dns: z.ipv4(),
});

export const NetworkValidationSchema = z.object({
  wifiEnabled: z.boolean(),
  wifiSsid: z.string().max(33),
  wifiPsk: z.string().max(64),
  wifiMode: WiFiModeEnum,
  wifiEapIdentity: z.string().max(64).optional(),
  wifiEapUsername: z.string().max(64).optional(),
  wifiEapPassword: z.string().max(64).optional(),
  ntpServer: z.string().min(0).max(33),
  ethEnabled: z.boolean(),
  addressMode: AddressModeEnum,
  ipv4Config: NetworkValidationIpV4ConfigSchema,
  enabledProtocols: ProtocolFlagsEnum,
  rsyslogServer: z.string().max(33),
});

export type NetworkValidation = z.infer<typeof NetworkValidationSchema>;
