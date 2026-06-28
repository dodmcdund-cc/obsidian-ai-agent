import { App, Modal } from "obsidian";

export class ChatModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.createEl("h2", { text: "AI agent chat" });
		contentEl.createEl("p", { text: "Chat interface coming soon." });
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
