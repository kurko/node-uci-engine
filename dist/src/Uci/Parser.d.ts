import { IScore } from "../Analysis/IScore";
import { IVariation } from "../Analysis/IVariation";
import { IEngineOption } from "../Engine/IEngineOption";
import { IEngineId } from "src/Engine/IEngineId";
export declare class Parser {
    static parseUciOk(output: string): boolean;
    static parseIsReady(output: string): boolean;
    static parseMoves(output: string): string[] | null;
    static parsePrincipalVariations(output: string, candidates?: Record<number, IVariation>): Record<number, IVariation>;
    static parseScore(output: string): IScore | null;
    static parseBestMove(output: string): [string, string | null] | null;
    static parseCurrmove(output: string): string | null;
    static parseCurrmoveNumber(output: string): number | null;
    static parseDepth(output: string): number | null;
    static parseHashfull(output: string): number | null;
    static parseId(output: string): IEngineId | null;
    static parseMultiPv(output: string): number | null;
    static parseNodes(output: string): number | null;
    static parseNps(output: string): number | null;
    static parseSeldepth(output: string): number | null;
    static parseTime(output: string): number | null;
    static parseOption(output: string): IEngineOption | null;
}
