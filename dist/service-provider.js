"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_kernel_1 = require("@arkecosystem/core-kernel");
const hapi_nes_1 = require("@arkecosystem/core-p2p/dist/hapi-nes");
class ServiceProvider extends core_kernel_1.Providers.ServiceProvider {
    async register() {
        const monitor = this.app.get(core_kernel_1.Container.Identifiers.PeerNetworkMonitor);
        if (monitor) {
            monitor.communicator.connector.create = async function (peer) {
                const connection = new hapi_nes_1.Client(`ws://${core_kernel_1.Utils.IpAddress.normalizeAddress(peer.ip)}:${peer.port}`, {
                    timeout: 10000,
                });
                this.connections.set(peer.ip, connection);
                this.lastConnectionCreate.set(peer.ip, Date.now());
                connection.onError = (error) => {
                    if (error.message !== "Connection timed out") {
                        this.logger.debug(`Socket error (peer ${core_kernel_1.Utils.IpAddress.normalizeAddress(peer.ip)}) : ${error.message}`);
                    }
                    this.disconnect(peer);
                };
                await connection.connect({ retries: 1, timeout: 5000 });
                return connection;
            };
        }
    }
}
exports.ServiceProvider = ServiceProvider;
//# sourceMappingURL=service-provider.js.map