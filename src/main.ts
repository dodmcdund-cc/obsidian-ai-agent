import { Notice, Plugin, TAbstractFile, TFile } from "obsidian";
import { AiAgentSettingTab, DEFAULT_SETTINGS, type AiAgentSettings } from "./settings";

export default class AiAgentPlugin extends Plugin {
	settings: AiAgentSettings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new AiAgentSettingTab(this.app, this));

		this.registerEvent(
			this.app.vault.on("create", (file: TAbstractFile) => this.checkMarkdownOnly(file)),
		);

		this.registerEvent(
			this.app.vault.on("rename", (file: TAbstractFile) => this.checkMarkdownOnly(file)),
		);
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<AiAgentSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private checkMarkdownOnly(file: TAbstractFile) {
		if (!(file instanceof TFile)) return;
		if (file.extension !== "md") {
			new Notice(`AI Agent only works with Markdown files. "${file.name}" is not supported.`);
		}
	}
}
