import { SinonSandbox } from 'sinon'

declare global {
	namespace Mocha {
		interface Context {
			sinon: SinonSandbox;
		}
	}
}
