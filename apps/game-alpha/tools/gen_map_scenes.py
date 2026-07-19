# Run from repo root: python tools/gen_map_scenes.py
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
splash = (ROOT / "Assets/Scenes/splashscreen.unity").read_text(encoding="utf-8")
base = "".join(splash.splitlines(True)[:284])


def make_scene(name: str, go: int, tr: int, pl: int, fsm: int, biome: int) -> None:
    driver = f"""--- !u!1 &{go}
GameObject:
  m_ObjectHideFlags: 0
  m_CorrespondingSourceObject: {{fileID: 0}}
  m_PrefabInstance: {{fileID: 0}}
  m_PrefabAsset: {{fileID: 0}}
  serializedVersion: 6
  m_Component:
  - component: {{fileID: {tr}}}
  - component: {{fileID: {pl}}}
  - component: {{fileID: {fsm}}}
  m_Layer: 0
  m_Name: Lifetopia_LevelDriver
  m_TagString: Untagged
  m_Icon: {{fileID: 0}}
  m_NavMeshLayer: 0
  m_StaticEditorFlags: 0
  m_IsActive: 1
--- !u!4 &{tr}
Transform:
  m_ObjectHideFlags: 0
  m_CorrespondingSourceObject: {{fileID: 0}}
  m_PrefabInstance: {{fileID: 0}}
  m_PrefabAsset: {{fileID: 0}}
  m_GameObject: {{fileID: {go}}}
  serializedVersion: 2
  m_LocalRotation: {{x: 0, y: 0, z: 0, w: 1}}
  m_LocalPosition: {{x: 0, y: 0, z: 0}}
  m_LocalScale: {{x: 1, y: 1, z: 1}}
  m_ConstrainProportionsScale: 0
  m_Children: []
  m_Father: {{fileID: 0}}
  m_LocalEulerAnglesHint: {{x: 0, y: 0, z: 0}}
--- !u!114 &{pl}
MonoBehaviour:
  m_ObjectHideFlags: 0
  m_CorrespondingSourceObject: {{fileID: 0}}
  m_PrefabInstance: {{fileID: 0}}
  m_PrefabAsset: {{fileID: 0}}
  m_GameObject: {{fileID: {go}}}
  m_Enabled: 1
  m_EditorHideFlags: 0
  m_Script: {{fileID: 11500000, guid: a7e4c2b91d6f42ae8c3b5d1e9f0a4b6ca, type: 3}}
  m_Name: 
  m_EditorClassIdentifier: 
  configOverride: {{fileID: 0}}
  levelBiome: {biome}
  syncTravelBiomeOnStart: 1
  enableFarmPlots: 0
  enableHudAndHotbar: 1
  backgroundSpriteOverride: {{fileID: 0}}
  ensureLevelFsm: 1
--- !u!114 &{fsm}
MonoBehaviour:
  m_ObjectHideFlags: 0
  m_CorrespondingSourceObject: {{fileID: 0}}
  m_PrefabInstance: {{fileID: 0}}
  m_PrefabAsset: {{fileID: 0}}
  m_GameObject: {{fileID: {go}}}
  m_Enabled: 1
  m_EditorHideFlags: 0
  m_Script: {{fileID: 11500000, guid: c9a6e4d13f814b409e5d73f1b2c6d8ef, type: 3}}
  m_Name: 
  m_EditorClassIdentifier: 
  state: 0
--- !u!1660057539 &9223372036854775807
SceneRoots:
  m_ObjectHideFlags: 0
  m_Roots:
  - {{fileID: 519420032}}
  - {{fileID: 673328998}}
  - {{fileID: {tr}}}
"""
    out = ROOT / "Assets" / "Scenes" / f"{name}.unity"
    out.write_text(base + driver, encoding="utf-8")
    print("wrote", out)


make_scene("map_city", 940100001, 940100002, 940100003, 940100004, 1)
make_scene("map_garden", 940200001, 940200002, 940200003, 940200004, 2)
make_scene("map_suburban", 940300001, 940300002, 940300003, 940300004, 3)
make_scene("map_fishing", 940400001, 940400002, 940400003, 940400004, 4)
