interface Workspace {
  CaseRollScene: WorldModel & {
    CaseCamera: Part;
  };
  Lobby: Folder & {
    Spawns: Folder;
  }
}
