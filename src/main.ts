import { Notice, Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, Settings, AiAgentSettingTab } from "./settings";

export default class ObsidianAiAgent extends Plugin {
	settings: Settings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new AiAgentSettingTab(this.app, this));

		this.app.workspace.onLayoutReady(() => {
			const activeFile = this.app.workspace.getActiveFile();
			if (activeFile && activeFile.extension !== 'md') {
				new Notice('Obsidian AI agent ne fonctionne que sur les fichiers Markdown');
			}
		});
	}

	onunload() { }

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData()) as Settings;
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
