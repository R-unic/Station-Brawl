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
        Effects: Folder & {
            Flame: Folder & {
                AuraTOP: ParticleEmitter;
                Aura: ParticleEmitter;
            };
            uhhsomecoolaura: Folder & {
                ["aura(electric)"]: ParticleEmitter;
                aura: ParticleEmitter;
            };
            Plasma: Folder & {
                Shine: ParticleEmitter;
                PurpleFire: ParticleEmitter;
                BlueFire: ParticleEmitter;
            };
            Electricity: Folder & {
                Electricity1: ParticleEmitter;
                Electricity2: ParticleEmitter;
            };
            PinkLightning: Folder & {
                ParticleEmitter2: ParticleEmitter;
                ParticleEmitter4: ParticleEmitter;
                ParticleEmitter: ParticleEmitter;
                ParticleEmitter3: ParticleEmitter;
                ParticleEmitter5: ParticleEmitter;
            };
            Galaxy: Folder & {
                ["Left Leg"]: Part & {
                    H7: ParticleEmitter;
                    H6: ParticleEmitter;
                    H5: ParticleEmitter;
                    H4: ParticleEmitter;
                    Part: Part;
                    H3: ParticleEmitter;
                    TOP: Attachment;
                    H1: ParticleEmitter;
                    BOTTOM: Attachment;
                    H8: ParticleEmitter;
                    H9: ParticleEmitter;
                    H10: ParticleEmitter;
                    H2: ParticleEmitter;
                };
                ["Right Arm"]: Part & {
                    Part: Part & {
                        H7: ParticleEmitter;
                        H6: ParticleEmitter;
                        H5: ParticleEmitter;
                        H4: ParticleEmitter;
                        H2: ParticleEmitter;
                        H3: ParticleEmitter;
                        H1: ParticleEmitter;
                        H8: ParticleEmitter;
                        H9: ParticleEmitter;
                        H10: ParticleEmitter;
                    };
                    TOP: Attachment;
                    BOTTOM: Attachment;
                };
                Head: Part & {
                    H7: ParticleEmitter;
                    H6: ParticleEmitter;
                    H5: ParticleEmitter;
                    H4: ParticleEmitter;
                    Part: Part;
                    face: Decal;
                    TOP: Attachment;
                    H1: ParticleEmitter;
                    H10: ParticleEmitter;
                    H3: ParticleEmitter;
                    H8: ParticleEmitter;
                    H9: ParticleEmitter;
                    H11: ParticleEmitter;
                    H2: ParticleEmitter;
                };
                Torso: Part & {
                    Part: Part;
                    TOP: Attachment;
                    BOTTOM: Attachment;
                    Attachment: Attachment & {
                        ParticleEmitter: ParticleEmitter;
                    };
                    TOP2: Attachment & {
                        Beam: Beam;
                    };
                    BOTTOM2: Attachment;
                    ["3"]: ParticleEmitter;
                    ["2"]: ParticleEmitter;
                    ["5"]: ParticleEmitter;
                    ["4"]: ParticleEmitter;
                    ["7"]: ParticleEmitter;
                    ["6"]: ParticleEmitter;
                    ["9"]: ParticleEmitter;
                    PointLight: PointLight;
                    ["8"]: ParticleEmitter;
                    ["1"]: ParticleEmitter;
                    ["10"]: ParticleEmitter;
                };
                ["Right Leg"]: Part & {
                    ["1"]: ParticleEmitter;
                    ["3"]: ParticleEmitter;
                    ["2"]: ParticleEmitter;
                    Part: Part;
                    ["4"]: ParticleEmitter;
                    TOP: Attachment;
                    ["6"]: ParticleEmitter;
                    ["9"]: ParticleEmitter;
                    ["8"]: ParticleEmitter;
                    BOTTOM: Attachment;
                    ["5"]: ParticleEmitter;
                    ["7"]: ParticleEmitter;
                    ["10"]: ParticleEmitter;
                };
                ["Left Arm"]: Part & {
                    TOP: Attachment;
                    Attachment: Attachment & {
                        ParticleEmitter: ParticleEmitter;
                    };
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
