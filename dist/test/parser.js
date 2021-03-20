"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const src_1 = require("../src");
describe("Parser", () => {
    describe("parseBestMove", () => {
        it("move only", () => {
            const result = src_1.Parser.parseBestMove('bestmove e2e4');
            chai_1.expect(result).to.deep.eq(['e2e4', null]);
        });
        it("move and ponder", () => {
            const result = src_1.Parser.parseBestMove('bestmove e2e4 ponder e7e5');
            chai_1.expect(result).to.deep.eq(['e2e4', 'e7e5']);
        });
    });
    describe("parseOption", () => {
        it("no default", () => {
            const result = src_1.Parser.parseOption('option name Debug Log File type string default');
            chai_1.expect(result).to.deep.eq({
                name: "Debug Log File",
                type: "string",
                default: null,
                vars: null,
                max: null,
                min: null,
            });
        });
        it("has default", () => {
            const result = src_1.Parser.parseOption('option name Ponder type check default false');
            chai_1.expect(result).to.deep.eq({
                name: "Ponder",
                type: "check",
                default: "false",
                vars: null,
                max: null,
                min: null,
            });
        });
        it("has min and max", () => {
            const result = src_1.Parser.parseOption('option name Contempt type spin default 0 min -100 max 100');
            chai_1.expect(result).to.deep.eq({
                name: "Contempt",
                type: "spin",
                default: "0",
                vars: null,
                max: "100",
                min: "-100",
            });
        });
        it("has vars", () => {
            const result = src_1.Parser.parseOption('option name Contempt type combo default Both var Off var White var Black var Both');
            chai_1.expect(result).to.deep.eq({
                name: "Contempt",
                type: "combo",
                default: "Both",
                vars: [
                    "Off",
                    "White",
                    "Black",
                    "Both",
                ],
                max: null,
                min: null,
            });
        });
    });
    describe("parsePrincipalVariations", () => {
        const variations = {
            "2": {
                "depth": 5,
                "score": 10,
                "scoreType": "cp",
                "timeMs": 100,
                "moves": "original"
            }
        };
        it("parses MultiPv and adds new variations", () => {
            const output = "info depth 7 seldepth 24 multipv 3 score cp 20 nodes 809947 nps 2060933 tbhits 0 time 200 pv f2f3 c8d7 c1e3 f8e7 a2a3 e8g8 b3a2";
            const result = src_1.Parser.parsePrincipalVariations(output, variations);
            chai_1.expect(result).to.deep.eq(Object.assign(Object.assign({}, variations), { "3": {
                    "depth": 7,
                    "score": 20,
                    "scoreType": "cp",
                    "timeMs": 200,
                    "moves": "f2f3 c8d7 c1e3 f8e7 a2a3 e8g8 b3a2"
                } }));
        });
        it("parses MultiPv and prioritizes greater depth", () => {
            const output = "info depth 7 seldepth 24 multipv 2 score cp -20 nodes 809947 nps 2060933 tbhits 0 time 200 pv f2f3 c8d7 c1e3 f8e7 a2a3 e8g8 b3a2";
            const result = src_1.Parser.parsePrincipalVariations(output, variations);
            chai_1.expect(result).to.deep.eq({
                2: {
                    "depth": 7,
                    "score": -20,
                    "scoreType": "cp",
                    "timeMs": 200,
                    "moves": "f2f3 c8d7 c1e3 f8e7 a2a3 e8g8 b3a2"
                }
            });
        });
        it("parses MultiPv and keeps depth from cache", () => {
            const output = "info depth 2 seldepth 24 multipv 2 score cp 20 nodes 809947 nps 2060933 tbhits 0 time 200 pv f2f3 c8d7 c1e3 f8e7 a2a3 e8g8 b3a2";
            const result = src_1.Parser.parsePrincipalVariations(output, variations);
            chai_1.expect(result).to.deep.eq(Object.assign({}, variations));
        });
    });
});
