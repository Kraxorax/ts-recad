import { generateTemplateClassesFromXSD, verbose } from "xsd2ts";
verbose()
generateTemplateClassesFromXSD('./src/recad.xsd');