interface ReplicatedStorage extends Instance {
	Auras: Folder & {
		Glitch: Part;
		Demonic: Folder;
		["Dark Aura"]: Folder;
	};
	Assets: Folder & {
		VFX: Folder & {
			Blood: Part & {
				Attachment: Attachment & {
					["bits [1]"]: ParticleEmitter;
					["bits [2]"]: ParticleEmitter;
					["blood [1]"]: ParticleEmitter;
				};
			};
		};
	};
	TS: Folder & {
		PlayerState: ModuleScript;
		components: Folder;
		network: ModuleScript;
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["@flamework"]: Folder & {
				core: Folder & {
					out: ModuleScript & {
						reflect: ModuleScript;
						modding: ModuleScript;
						flamework: ModuleScript;
					};
				};
				components: Folder & {
					out: ModuleScript;
				};
				networking: Folder & {
					out: ModuleScript & {
						events: Folder & {
							createClientHandler: ModuleScript;
							createServerHandler: ModuleScript;
							createNetworkingEvent: ModuleScript;
						};
						functions: Folder & {
							createClientHandler: ModuleScript;
							createNetworkingFunction: ModuleScript;
							createServerHandler: ModuleScript;
							errors: ModuleScript;
						};
						handlers: ModuleScript;
						middleware: Folder & {
							createMiddlewareProcessor: ModuleScript;
							skip: ModuleScript;
						};
						util: Folder & {
							populateInstanceMap: ModuleScript;
						};
					};
				};
			};
			["@rbxts"]: Folder & {
				types: Folder & {
					include: Folder & {
						generated: Folder;
					};
				};
				["compiler-types"]: Folder & {
					types: Folder;
				};
				services: ModuleScript;
				signal: ModuleScript;
				t: Folder & {
					lib: Folder & {
						ts: ModuleScript;
					};
				};
				maid: Folder & {
					Maid: ModuleScript;
				};
				["object-utils"]: ModuleScript;
			};
		};
	};
}
