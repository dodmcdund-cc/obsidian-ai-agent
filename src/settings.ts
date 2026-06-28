import { App, PluginSettingTab, Setting } from "obsidian";
import AiAgentPlugin from "./main";

export interface AiAgentSettings {
	apiKey: string;
	apiUrl: string;
	model: string;
}

export const DEFAULT_SETTINGS: AiAgentSettings = {
	apiKey: "",
	apiUrl: "https://api.minimax.io",
	model: "gpt-4o",
}

export const MODEL_OPTIONS = [
	{ value: "gpt-4o", label: "gpt-4o" },
	{ value: "gpt-4o-mini", label: "gpt-4o-mini" },
	{ value: "claude-sonnet-4", label: "claude-sonnet-4" },
	{ value: "claude-haiku-4", label: "claude-haiku-4" },
	{ value: "o3", label: "o3" },
	{ value: "o4-mini", label: "o4-mini" },
] as const;

export class AiAgentSettingTab extends PluginSettingTab {
	plugin: AiAgentPlugin;

	constructor(app: App, plugin: AiAgentPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("API key")
			.setDesc("Your API key for the AI provider")
			.addText(text => {
				text
					.setPlaceholder("Sk-...")
					.setValue(this.plugin.settings.apiKey)
					.onChange(async (value: string) => {
						this.plugin.settings.apiKey = value;
						await this.plugin.saveSettings();
					});
				text.inputEl.type = "password";
			});

		new Setting(containerEl)
			.setName("API URL")
			.setDesc("Base URL for the AI API")
			.addText(text => text
				.setPlaceholder("https://api.minimax.io")
				.setValue(this.plugin.settings.apiUrl)
				.onChange(async (value: string) => {
					this.plugin.settings.apiUrl = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("Model")
			.setDesc("AI model to use for chat completions")
			.addDropdown(dropdown => {
				for (const opt of MODEL_OPTIONS) {
					dropdown.addOption(opt.value, opt.label);
				}
				dropdown
					.setValue(this.plugin.settings.model)
					.onChange(async (value: string) => {
						this.plugin.settings.model = value;
						await this.plugin.saveSettings();
					});
			});
	}
}
