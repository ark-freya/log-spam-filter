import { Container, Contracts, Providers, Utils } from "@arkecosystem/core-kernel";
import { Client } from "@arkecosystem/core-p2p/dist/hapi-nes";

export class ServiceProvider extends Providers.ServiceProvider {
    public async register(): Promise<void> {
        const monitor = this.app.get<Contracts.P2P.NetworkMonitor>(Container.Identifiers.PeerNetworkMonitor);
        if (monitor) {
            (monitor as any).communicator.connector.create = async function(peer: Contracts.P2P.Peer): Promise<Client> {
                const connection = new Client(`ws://${Utils.IpAddress.normalizeAddress(peer.ip)}:${peer.port}`, {
                    timeout: 10000,
                });
                this.connections.set(peer.ip, connection);
                this.lastConnectionCreate.set(peer.ip, Date.now());

                connection.onError = (error) => {
                    if (error.message !== "Connection timed out") {
                        this.logger.debug(`Socket error (peer ${Utils.IpAddress.normalizeAddress(peer.ip)}) : ${error.message}`);
                    }
                    this.disconnect(peer);
                };

                await connection.connect({ retries: 1, timeout: 5000 });

                return connection;
            };
        }
    }
}
