
export class Recad {
    public static readonly className = "Recad";
    public recadRoot?: RecadRoot;
    public shape?: Shape;
    public materialRef?: MaterialRef;

    public constructor(props?: Recad) {


        if (props) {

            this.recadRoot = (props.recadRoot) ? new RecadRoot(props.recadRoot) : undefined;
            this.shape = (props.shape) ? new Shape(props.shape) : undefined;
            this.materialRef = (props.materialRef) ? new MaterialRef(props.materialRef) : undefined;
        }
    }
}

export class RecadRoot {
    public static readonly className = "RecadRoot";
    public General?: General;

    public constructor(props?: RecadRoot) {


        if (props) {

            this.General = (props.General) ? new General(props.General) : undefined;
        }
    }
}

export class General {
    public static readonly className = "General";
    public Version?: string;
    public Author?: string;

    public constructor(props?: General) {


        if (props) {

            this.Version = props.Version;
            this.Author = props.Author;
        }
    }
}

export class Shape {
    public static readonly className = "Shape";
    public constructor(props?: Shape) {
    }
}

export class RoomType {
    public static readonly className = "RoomType";
    public $name?: string;
    public $id?: number;
    public $uuid?: any;

    public constructor(props?: RoomType) {
        if (props) {
            this.$name = props.$name;
            this.$id = props.$id;
            this.$uuid = props.$uuid;
        }
    }
}

export class MeasuringSurfaceType {
    public static readonly className = "MeasuringSurfaceType";
    public $name?: string;
    public $type?: number;
    public $ref_to?: string;

    public constructor(props?: MeasuringSurfaceType) {


        if (props) {

            this.$name = props.$name;
            this.$type = props.$type;
            this.$ref_to = props.$ref_to;
        }
    }
}

export class SensorType {
    public static readonly className = "SensorType";
    public $id?: any;
    public $ref_id?: any;

    public constructor(props?: SensorType) {


        if (props) {

            this.$id = props.$id;
            this.$ref_id = props.$ref_id;
        }
    }
}

export class ShortInfoType {
    public static readonly className = "ShortInfoType";
    public constructor(props?: ShortInfoType) {
    }
}

export class ShortInfoSensorType {
    public static readonly className = "ShortInfoSensorType";
    public constructor(props?: ShortInfoSensorType) {
    }
}

export class LuminaireType {
    public static readonly className = "LuminaireType";
    public $id?: any;
    public $ref_id?: any;
    public $use_target?: boolean;

    public constructor(props?: LuminaireType) {


        if (props) {

            this.$id = props.$id;
            this.$ref_id = props.$ref_id;
            this.$use_target = props.$use_target;
        }
    }
}

export class GeometryRefType {
    public static readonly className = "GeometryRefType";
    public $id?: any;
    public $ref_id?: any;
    public $use_target?: boolean;

    public constructor(props?: GeometryRefType) {


        if (props) {

            this.$id = props.$id;
            this.$ref_id = props.$ref_id;
            this.$use_target = props.$use_target;
        }
    }
}

export class ResultType {
    public static readonly className = "ResultType";
    public $type?: any;
    public $calc_height?: number;

    public constructor(props?: ResultType) {


        if (props) {

            this.$type = props.$type;
            this.$calc_height = props.$calc_height;
        }
    }
}

export class WallType {
    public static readonly className = "WallType";
    //choice

    public Start(arg: string) {
        delete ((this as any).End);
        (this as any).Start = arg;
    }

    //choice

    public End(arg: string) {
        delete ((this as any).Start);
        (this as any).End = arg;
    }

    public constructor(props?: WallType) {
    }
}

export class MaterialRef {
    public static readonly className = "MaterialRef";
    public $ref_id?: any;

    public constructor(props?: MaterialRef) {


        if (props) {

            this.$ref_id = props.$ref_id;
        }
    }
}

export class ObjectType {
    public static readonly className = "ObjectType";
    public $id?: any;
    public $name?: any;
    public $type?: number;

    public constructor(props?: ObjectType) {


        if (props) {

            this.$id = props.$id;
            this.$name = props.$name;
            this.$type = props.$type;
        }
    }
}

export class SceneType {
    public static readonly className = "SceneType";
    public $name?: any;
    public $uuid?: any;

    public constructor(props?: SceneType) {


        if (props) {

            this.$name = props.$name;
            this.$uuid = props.$uuid;
        }
    }
}

export class StructureType {
    public static readonly className = "StructureType";
    public constructor(props?: StructureType) {
    }
}

export class ShapeType {
    public static readonly className = "ShapeType";
    public $nSize?: number;
    public $is_line?: boolean;

    public constructor(props?: ShapeType) {


        if (props) {

            this.$nSize = props.$nSize;
            this.$is_line = props.$is_line;
        }
    }
}

export class WallElementType {
    public static readonly className = "WallElementType";
    public Width?: number;
    public Height?: number;
    public Rotation?: number;
    public $type?: string;
    public $align?: any;

    public constructor(props?: WallElementType) {


        if (props) {

            this.Width = props.Width;
            this.Height = props.Height;
            this.Rotation = props.Rotation;
            this.$type = props.$type;
            this.$align = props.$align;
        }
    }
}

export class GroundElementType {
    public static readonly className = "GroundElementType";
    public $type?: any;
    public $lanes?: number;

    public constructor(props?: GroundElementType) {


        if (props) {

            this.$type = props.$type;
            this.$lanes = props.$lanes;
        }
    }
}

export class CeilingElementType {
    public static readonly className = "CeilingElementType";
    public $type?: any;

    public constructor(props?: CeilingElementType) {


        if (props) {

            this.$type = props.$type;
        }
    }
}

export class CalcSettingsType {
    public static readonly className = "CalcSettingsType";
    public $autoprocess?: any;

    public constructor(props?: CalcSettingsType) {


        if (props) {

            this.$autoprocess = props.$autoprocess;
        }
    }
}

export class SceneResultType {
    public static readonly className = "SceneResultType";
    public constructor(props?: SceneResultType) {
    }
}

export class GeoInfoType {
    public static readonly className = "GeoInfoType";
    public constructor(props?: GeoInfoType) {
    }
}

export class MeshDefType {
    public static readonly className = "MeshDefType";
    public $id?: number;
    public $name?: string;
    public $doublesided?: boolean;
    public $design?: boolean;
    public $uuid?: string;
    public $clsid?: string;

    public constructor(props?: MeshDefType) {


        if (props) {

            this.$id = props.$id;
            this.$name = props.$name;
            this.$doublesided = props.$doublesided;
            this.$design = props.$design;
            this.$uuid = props.$uuid;
            this.$clsid = props.$clsid;
        }
    }
}

export class SensorDefType {
    public static readonly className = "SensorDefType";
    public $id?: number;
    public $name?: string;
    public $uuid?: string;
    public $clsid?: string;

    public constructor(props?: SensorDefType) {


        if (props) {

            this.$id = props.$id;
            this.$name = props.$name;
            this.$uuid = props.$uuid;
            this.$clsid = props.$clsid;
        }
    }
}

export class LuminaireDefType {
    public static readonly className = "LuminaireDefType";
    public ShortInfo?: ShortInfoType;
    public $id?: number;
    public $name?: string;
    public $uuid?: string;
    public $clsid?: string;

    public constructor(props?: LuminaireDefType) {


        if (props) {

            this.ShortInfo = (props.ShortInfo) ? new ShortInfoType(props.ShortInfo) : undefined;
            this.$id = props.$id;
            this.$name = props.$name;
            this.$uuid = props.$uuid;
            this.$clsid = props.$clsid;
        }
    }
}

export class UtilisationType {
    public static readonly className = "UtilisationType";
    public constructor(props?: UtilisationType) {
    }
}

export class ProjectInfoType {
    public static readonly className = "ProjectInfoType";
    public Number?: string;
    public Object?: string;
    public Installation?: string;
    public Description?: string;
    public Processor?: string;
    public Client?: string;
    public Date?: string;

    public constructor(props?: ProjectInfoType) {


        if (props) {

            this.Number = props.Number;
            this.Object = props.Object;
            this.Installation = props.Installation;
            this.Description = props.Description;
            this.Processor = props.Processor;
            this.Client = props.Client;
            this.Date = props.Date;
        }
    }
}

export class MaterialDef {
    public static readonly className = "MaterialDef";
    public $id?: number;
    public $name?: string;
    public $default_for?: any;

    public constructor(props?: MaterialDef) {


        if (props) {

            this.$id = props.$id;
            this.$name = props.$name;
            this.$default_for = props.$default_for;
        }
    }
}

export class BooleanObjectType {
    public static readonly className = "BooleanObjectType";
    public $name?: any;
    public $operator?: any;

    //choice

    public Object?(arg: ObjectType[]) {
        delete ((this as any).BooleanObject);
        (this as any).Object = arg;
    }

    //choice

    public BooleanObject?(arg: BooleanObjectType[]) {
        delete ((this as any).Object);
        (this as any).BooleanObject = arg;
    }

    public constructor(props?: BooleanObjectType) {


        if (props) {

            this.$name = props.$name;
            this.$operator = props.$operator;
        }
    }
}

export class SceneInfoDef {
    public static readonly className = "SceneInfoDef";
    public constructor(props?: SceneInfoDef) {
    }
}

export class LocationDef {
    public static readonly className = "LocationDef";
    public constructor(props?: LocationDef) {
    }
}

export class MeshType {
    public static readonly className = "MeshType";
    public $id?: any;
    public $name?: any;
    public $ref_id?: any;

    public constructor(props?: MeshType) {


        if (props) {

            this.$id = props.$id;
            this.$name = props.$name;
            this.$ref_id = props.$ref_id;
        }
    }
}

export class FreeSurfaceType {
    public static readonly className = "FreeSurfaceType";
    public Shape?: Shape;
    public MaterialRef?: MaterialRef;
    public FreeSurface?: FreeSurfaceType[];
    public $type?: any;

    public constructor(props?: FreeSurfaceType) {


        if (props) {

            this.Shape = (props.Shape) ? new Shape(props.Shape) : undefined;
            this.MaterialRef = (props.MaterialRef) ? new MaterialRef(props.MaterialRef) : undefined;
            this.FreeSurface = props.FreeSurface?.map(o => new FreeSurfaceType(o));
            this.$type = props.$type;
        }
    }
}

export class StoreyInfoType {
    public static readonly className = "StoreyInfoType";
    public constructor(props?: StoreyInfoType) {
    }
}

export type RecadElementType
    = Recad
    | RecadRoot
    | General
    | Shape
    | RoomType
    | MeasuringSurfaceType
    | SensorType
    | ShortInfoType
    | ShortInfoSensorType
    | LuminaireType
    | GeometryRefType
    | ResultType
    | WallType
    | MaterialRef
    | ObjectType
    | SceneType
    | StructureType
    | ShapeType
    | WallElementType
    | GroundElementType
    | CeilingElementType
    | CalcSettingsType
    | SceneResultType
    | GeoInfoType
    | MeshDefType
    | SensorDefType
    | LuminaireDefType
    | UtilisationType
    | ProjectInfoType
    | MaterialDef
    | BooleanObjectType
    | SceneInfoDef
    | LocationDef
    | MeshType
    | FreeSurfaceType
    | StoreyInfoType


