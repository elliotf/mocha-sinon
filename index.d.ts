import { SinonSandbox } from 'sinon'

declare global {
	namespace Mocha {
		interface Suite {
			sinon: SinonSandbox;
		}
	}
}
