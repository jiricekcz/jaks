import { TokenConfiguration } from "../types/tokenConfig";
import { TokenHeader as ITokenHeader } from "../types/token";


/**
 * The class of a JAKS token. This is a final class and can be extended to make shortcuts.
 */
export class Token<Configuration extends TokenConfiguration> implements ITokenHeader<Configuration> {

}