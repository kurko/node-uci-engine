/// <reference types="node" />
import { EventEmitter } from "events";
import { IVariation } from "../Analysis/IVariation";
import { Event } from "./Event";
export declare class Handler extends EventEmitter {
    protected variations: Record<number, IVariation>;
    handle(output: string): void;
    reset(): void;
    protected emitEvent(event: Event): void;
}
