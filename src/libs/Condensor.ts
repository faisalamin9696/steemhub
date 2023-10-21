import { Client } from "@hiveio/dhive";
import { AppStrings } from "../constants/AppStrings";

export let client = new Client(AppStrings.rpc_servers[0], {
    timeout: AppStrings.chain_timeout,
    addressPrefix: AppStrings.chain_prefix,
    chainId: AppStrings.chain_id,
    failoverThreshold: 10,
    consoleOnFailover: true,
});

