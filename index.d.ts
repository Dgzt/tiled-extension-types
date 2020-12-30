declare const tiled: Tiled;
declare const Qt: Qt;

interface Tiled {

    readonly version: string;
    readonly platform: string;
    readonly arch: string;
    readonly actions: Array<string>;
    readonly menus: Array<string>;
    activeAsset : Asset | null;
    readonly openAssets: Array<any>;
    mapEditor: MapEditor;
    tilesetEditor: TilesetEditor;
    readonly tilesetFormats: Array<string>;
    readonly mapFormats: Array<string>;

    alert(text: string, title?: string): void;

    close(asset: Asset): boolean;

    confirm(text: string, title?: string): boolean;

    error(text: string, activated: () => void): void;

    executeCommand(name: string, inTerminal: boolean): void;

    extendMenu(id: string, items: Array<any> | any) : void;

    log(text: string);

    open(fileName: string): Asset | null;

    prompt(label: string, text?: string, title?: string): string;

    registerAction(id: string, callback: () => void): Action;

    registerMapFormat(shortName: string, mapFormat: any): void;

    registerTilesetFormat(shortName: string, tilesetFormat: any): void;

    registerTool(shortName: string, tool: any): any;

    reload(asset: Asset): Asset | null;

    tilesetFormat(shortName: string): TilesetFormat;

    trigger(action: string): void;

    warn(text: string, activated: () => void): void;
}

interface Qt {
    rect(x, y, width, height): Rectangle;
    size(width, height): Rectangle;
}

declare enum AlignmentEnum {
    AlignLeft = 0x0001,
    AlignRight = 0x0002,
    AlignHCenter = 0x0004,
    AlignJustify = 0x0008,
    AlignTop = 0x0020,
    AlignBottom = 0x0040,
    AlignVCenter = 0x0080,
    AlignCenter = AlignVCenter | AlignHCenter
}

declare enum LayerDataFormatEnum {
    XML = 'XML',
    Base64 = 'Base64',
    Base64Gzip = 'Base64Gzip',
    Base64Zlib = 'Base64Zlib',
    Base64Zstandard = 'Base64Zstandard',
    CSV = 'CSV'
}

declare enum OrientationEnum {
    Unknown = 'Unknown',
    Orthogonal = 'Orthogonal',
    Isometric = 'Isometric',
    Staggered = 'Staggered',
    Hexagonal = 'Hexagonal'
}

declare enum RenderOrderEnum {
    RightDown = 'RightDown',
    RightUp = 'RightUp',
    LeftDown = 'LeftDown',
    LeftUp = 'LeftUp'
}

declare enum StaggerAxisEnum {
    StaggerX = 'StaggerX',
    StaggerY = 'StaggerY'
}

declare enum StaggerIndexEnum {
    StaggerOdd = 'StaggerOdd',
    StaggerEven = 'StaggerEven'
}

interface Action {
    checkable: boolean;
    checked: boolean;
    enabled: boolean;
    icon: string;
    iconVisibleInMenu: boolean;
    id: string;
    text: string;
    visible: boolean;
}

interface Asset {
    readonly fileName: string;
    readonly modified: boolean;
    readonly isTileMap: boolean;
    readonly isTileset: boolean;
}

interface Font {
    family: string;
    pixelSize: number;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikeOut: boolean;
    kerning: boolean;
}

interface Layer {
    name: string;
    opacity: number;
    visible: boolean;
    locked: boolean;
    offset: Point;
    map: TileMap;
    selected: boolean;
    readonly isTileLayer: boolean;
    readonly isObjectLayer: boolean;
    readonly isGroupLayer: boolean;
    readonly isImageLayer: boolean;
}

interface MapEditor {
    currentBrush: TileMap;
    readonly currentMapView: MapView;
    readonly tilesetsView: TilesetsView;
}

interface MapObject {
    readonly id: number;
    shape: number;
    name: string;
    type: string;
    x: number;
    y: number;
    pos: Point;
    width: number;
    height: number;
    size: Size;
    rotation: number;
    visible: boolean;
    polygon: Array<Point>;
    text: string;
    font: Font;
    textAlignment: AlignmentEnum;
    wordWrap: boolean;
    textColor: any;
    tile: Tile;
    tileFlippedHorizontally: boolean;
    tileFlippedVertically: boolean;
    selected: boolean;
    readonly layer: ObjectGroup | null;
    readonly map: TileMap;
}

interface MapView {
    scale: number;

    centerOn(x: number, y: number): void;
}

interface ObjectGroup {
    readonly objects: Array<MapObject>;
    readonly objectCount: number;
    color: any;

    objectAt(index: number): MapObject;
    removeObjectAt(index: number): void;
    removeObject(object: MapObject): void;
    insertObjectAt(index: number, object: MapObject): void;
    addObject(object: MapObject): void;
}

interface Point {
    x: number;
    y: number;
}

interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface SelectedArea {
    boundingRect: Rectangle;
}

interface Size {
    width: number;
    height: number;
}

interface Tile {
    readonly id: number;
    readonly width: number;
    readonly height: number;
    readonly size: Size;
    type: string;
    imageFileName: string;
    // terrain: Terrains;
    probability: number;
    // objectGroup : ObjectGroup;
    // frames : Array<frame>;
    readonly animated: boolean;
    readonly tileset: Tileset;
}

interface TileCollisionEditor {
    selectedObjects: Array<MapObject>;
    view: Array<MapView>;

    focusObject(object: MapObject): void;
}

interface TileLayer extends Layer{

    width: number;
    height: number;
    size: Size;

    tileAt(x: number, y: number): Tile;
}

interface TileMap extends Asset {
    width: number;
    height: number;
    readonly size: Size;
    tileWidth: number;
    tileHeight: number;
    infinite: boolean;
    hexSideLength: number;
    staggerAxis: StaggerAxisEnum;
    orientation: OrientationEnum;
    renderOrder: RenderOrderEnum;
    staggerIndex: StaggerIndexEnum;
    // backgroundColor: color;
    layerDataFormat: LayerDataFormatEnum;
    readonly layerCount: number;
    tilesets: Array<Tileset>;
    selectedArea: SelectedArea;
    currentLayer: Layer;
    selectedLayers: Array<Layer>;
    // selectedObjects : Array<MapObject>;
}

interface Tileset extends Asset {
    name: string;
    image: string;
    readonly tiles : Array<Tile>;
    // terrains : Array<Terrain>;
    tileCount: number;
    nextTileId: number;
    tileWidth: number;
    tileHeight: number;
    tileSize: Size;
    readonly imageWidth: number;
    readonly imageHeight: number;
    readonly imageSize: Size;
    readonly tileSpacing: number;
    readonly margin: number;
    // objectAlignment: Alignment;
    // tileOffset: point;
    // orientation: Orientation;
    // backgroundColor: color;
    readonly isCollection: boolean;
    selectedTiles: Array<Tile>;
}

interface TilesetEditor {
    collisionEditor: TileCollisionEditor
}

interface TilesetFormat {
    read(fileName: string): Tileset;
    write(tileset: Tileset, fileName: string): string;
}

interface TilesetsView {
    currentTileset: Tileset;
    selectedTiles: Array<Tile>;
}
