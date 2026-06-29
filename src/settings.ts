import { App, PluginSettingTab, Setting } from "obsidian";
import ObsidianAiAgent from "./main";

export interface Settings {
	apiKey: string;
	apiUrl: string;
	model: string;
}

export const MODEL_OPTIONS = [
	"gpt-4o",
	"gpt-4o-mini",
	"claude-sonnet-4",
	"claude-haiku-4",
	"o3",
	"o4-mini",
] as const;

export const DEFAULT_SETTINGS: Settings = {
	apiKey: "",
	apiUrl: "https://api.minimax.io",
	model: "gpt-4o",
};

export class AiAgentSettingTab extends PluginSettingTab {
	plugin: ObsidianAiAgent;

	constructor(app: App, plugin: ObsidianAiAgent) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("API key")
			.setDesc("Your AI API key")
			.addText((text) =>
				text
					.setPlaceholder("Sk-...")
					.setValue(this.plugin.settings.apiKey)
					.onChange(async (value: string) => {
						this.plugin.settings.apiKey = value;
						await this.plugin.saveSettings();
					}),
			)
			.controlEl.querySelector("input")?.setAttribute("type", "password");

		new Setting(containerEl)
			.setName("API URL")
			.setDesc("Base URL for the AI API")
			.addText((text) =>
				text
					.setPlaceholder("https://api.minimax.io")
					.setValue(this.plugin.settings.apiUrl)
					.onChange(async (value: string) => {
						this.plugin.settings.apiUrl = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Model")
			.setDesc("AI model to use")
			.addDropdown((dropdown) =>
				dropdown
					.addOptions(
						Object.fromEntries(MODEL_OPTIONS.map((m) => [m, m])),
					)
					.setValue(this.plugin.settings.model)
					.onChange(async (value: string) => {
						this.plugin.settings.model = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
