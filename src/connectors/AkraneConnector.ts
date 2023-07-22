/* import { VenlySubProviderOptions } from '@venly/web3-provider';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
export type AkraneConnectorArguments = VenlySubProviderOptions;
export class AkraneConnectorClientIdError extends Error {
    public constructor() {
        super()
        this.name = this.constructor.name
        this.message = 'Please provide an Venly client id'
    }  
}
export class AkraneConnectorLoginError extends Error {
    public constructor(errorMessage: string) {
        super()
        this.name = this.constructor.name
        this.message = errorMessage
    }  
}
export class AkraneConnector extends AbstractConnector {
  private venlyProviderOptions: VenlySubProviderOptions;
  public venlyProvider: any;
  
  constructor(options: AkraneConnectorArguments) {
    super();
    this.venlyProviderOptions = options;
  }
  public async activate(): Promise<ConnectorUpdate> {
    // when no client Id found
    if(!this.venlyProviderOptions.clientId){
       throw new AkraneConnectorClientIdError(); 
    }
    try{
        const options = {
            clientId: this.venlyProviderOptions.clientId,
            secretType: this.venlyProviderOptions.secretType || "ETHEREUM",
            environment: this.venlyProviderOptions.environment,
            authenticationOptions: this.venlyProviderOptions.authenticationOptions,
            signMethod: "POPUP"
          };
          this.venlyProvider = await (window as any).Venly.createProviderEngine(
            options
          );
          } catch(err){
            if(err instanceof Error){
              throw new AkraneConnectorLoginError(err.message);  
            }
          }         
    
} */
