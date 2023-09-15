import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface HttpHeader { 'value' : string, 'name' : string }
export interface HttpResponse {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export interface HttpTransformArgs {
  'context' : Uint8Array | number[],
  'response' : HttpResponse,
}
export interface ManualReply {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export interface _SERVICE {
  'randomBytes' : ActorMethod<[], string>,
  'xkcd' : ActorMethod<[], ManualReply>,
  'xkcdTransform' : ActorMethod<[HttpTransformArgs], HttpResponse>,
}
