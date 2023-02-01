interface PlayerGui extends BasePlayerGui {
	Inventory: ScreenGui & {
		Frame: Frame & {
			UICorner: UICorner;
			ScrollingFrame: ScrollingFrame & {
				Plasma: Frame & {
					TextLabel: TextLabel;
					UICorner: UICorner;
					UIStroke: UIStroke;
					TextButton: TextButton & {
						UICorner: UICorner;
						LocalScript: LocalScript;
					};
					ImageLabel: ImageLabel;
				};
				Electricity: Frame & {
					TextLabel: TextLabel;
					UICorner: UICorner;
					UIStroke: UIStroke;
					TextButton: TextButton & {
						UICorner: UICorner;
						LocalScript: LocalScript;
					};
					ImageLabel: ImageLabel;
				};
				Flame: Frame & {
					TextLabel: TextLabel;
					UICorner: UICorner;
					UIStroke: UIStroke;
					TextButton: TextButton & {
						UICorner: UICorner;
						LocalScript: LocalScript;
					};
					ImageLabel: ImageLabel;
				};
			};
			UIGradient: UIGradient;
		};
		OpenButton: Frame & {
			UICorner: UICorner;
			TextLabel: TextLabel;
			ImageButton: ImageButton & {
				LocalScript: LocalScript;
			};
		};
	};
	Shop: ScreenGui & {
		ShopUi: Frame & {
			Buy1: Folder & {
				Frame: Frame & {
					UICorner: UICorner;
					UIStroke: UIStroke;
					TextButton: TextButton & {
						UICorner: UICorner;
					};
				};
			};
			UIGradient: UIGradient;
			TextButton: TextButton & {
				LocalScript: LocalScript;
			};
			ShopToggle: Frame & {
				UICorner: UICorner;
				TextLabel: TextLabel;
				Button: ImageButton & {
					LocalScript: LocalScript;
					UIStroke: UIStroke;
					UICorner: UICorner;
				};
			};
			UICorner: UICorner;
			UIStroke1: Frame & {
				UICorner: UICorner;
				UIStroke: UIStroke;
			};
		};
		OpenButton: Frame & {
			UICorner: UICorner;
			TextButton: TextButton & {
				LocalScript: LocalScript;
			};
		};
		RobuxShopUI: Frame & {
			UIStroke1: Frame & {
				UICorner: UICorner;
				UIStroke: UIStroke;
			};
			UIGradient: UIGradient;
			TextButton: TextButton & {
				LocalScript: LocalScript;
			};
			ShopToggle: Frame & {
				UICorner: UICorner;
				UIStroke: UIStroke;
				TextLabel: TextLabel;
				Button: ImageButton & {
					LocalScript: LocalScript;
				};
			};
			ScrollingFrame: ScrollingFrame & {
				Buy1: Folder & {
					Frame: Frame & {
						TextButton: TextButton & {
							UICorner: UICorner;
							LocalScript: LocalScript;
						};
						UIStroke: UIStroke;
						UICorner: UICorner;
						ImageLabel: ImageLabel & {
							["Robux Logo"]: Decal;
						};
					};
				};
				Buy3: Folder & {
					Frame: Frame & {
						TextButton: TextButton & {
							UICorner: UICorner;
							LocalScript: LocalScript;
						};
						UIStroke: UIStroke;
						UICorner: UICorner;
						ImageLabel: ImageLabel & {
							["Robux Logo"]: Decal;
						};
					};
				};
				Buy6: Folder & {
					Frame: Frame & {
						TextButton: TextButton & {
							UICorner: UICorner;
							LocalScript: LocalScript;
						};
						UIStroke: UIStroke;
						UICorner: UICorner;
						ImageLabel: ImageLabel & {
							["Robux Logo"]: Decal;
						};
					};
				};
				Buy5: Folder & {
					Frame: Frame & {
						TextButton: TextButton & {
							UICorner: UICorner;
							LocalScript: LocalScript;
						};
						UIStroke: UIStroke;
						UICorner: UICorner;
						ImageLabel: ImageLabel & {
							["Robux Logo"]: Decal;
						};
					};
				};
				Buy4: Folder & {
					Frame: Frame & {
						TextButton: TextButton & {
							UICorner: UICorner;
							LocalScript: LocalScript;
						};
						UIStroke: UIStroke;
						UICorner: UICorner;
						ImageLabel: ImageLabel & {
							["Robux Logo"]: Decal;
						};
					};
				};
				Buy2: Folder & {
					Frame: Frame & {
						TextButton: TextButton & {
							UICorner: UICorner;
							LocalScript: LocalScript;
						};
						UIStroke: UIStroke;
						UICorner: UICorner;
						ImageLabel: ImageLabel & {
							["Robux Logo"]: Decal;
						};
					};
				};
			};
			UICorner: UICorner;
		};
	};
	Codes: ScreenGui & {
		CodesUI: Frame & {
			CloseButton: TextButton & {
				LocalScript: LocalScript;
			};
			TextLabel: TextLabel;
			RedeemCodes: Frame & {
				UICorner: UICorner;
				UIStroke: UIStroke;
			};
			UICorner: UICorner & {
				TextLabel: TextLabel;
			};
			LocalScript: LocalScript;
			RedeemButton: TextButton & {
				UICorner: UICorner;
				LocalScript: LocalScript;
			};
			CodesBox: Frame & {
				UICorner: UICorner;
				UIStroke: UIStroke;
				TextBox: TextBox;
			};
		};
	};
	Text: ScreenGui & {
		why: TextLabel & {
			UICorner: UICorner;
		};
		["what do u want"]: TextLabel & {
			UICorner: UICorner;
		};
	};
	CinematicBars: ScreenGui & {
		B: Frame;
		T: Frame;
	};
}
