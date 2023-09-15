import { blob, Result, $update, match, ic, nat, Manual, Principal, $query, Opt } from 'azle';
import decodeUtf8 from 'decode-utf8';
import {
    managementCanister
} from 'azle/canisters/management';
import type { HttpResponse, HttpTransformArgs } from 'azle/canisters/management';

$update;
export async function randomBytes(): Promise<string> {
    const randomBytesCall = await managementCanister.raw_rand().call();

    return match(randomBytesCall, {
        Ok: (rand) => (decodeUtf8(Uint8Array.from(rand))),
        Err: (err) => ic.trap(err ?? 'Error occurred'),
    });
}

$update;
export async function xkcd(): Promise<HttpResponse> {
    const httpResult = await managementCanister
        .http_request({
            url: `https://xkcd.com/642/info.0.json`,
            max_response_bytes: Opt.Some(2_000n),
            method: {
                get: null
            },
            headers: [],
            body: Opt.None,
            transform: Opt.Some({
                function: [ic.id(), 'xkcdTransform'],
                context: Uint8Array.from([])
            })
        })
        .cycles(50_000_000n)
        .call();

    return match(httpResult, {
        Ok: (httpResponse) => httpResponse,
        Err: (err) => ic.trap(err)
    });
}

$query;
export function xkcdTransform(args: HttpTransformArgs): HttpResponse {
    return {
        ...args.response,
        headers: []
    };
}