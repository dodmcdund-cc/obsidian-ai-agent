export class Agent {
	constructor(
		public apiKey: string,
		public apiUrl: string,
		public model: string,
	) {}

	sendMessage(message: string): Promise<string> {
		void message;
		return Promise.resolve("");
	}
}
