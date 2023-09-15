export const idlFactory = ({ IDL }) => {
  const HttpHeader = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
  const ManualReply = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HttpHeader),
  });
  const HttpResponse = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HttpHeader),
  });
  const HttpTransformArgs = IDL.Record({
    'context' : IDL.Vec(IDL.Nat8),
    'response' : HttpResponse,
  });
  return IDL.Service({
    'randomBytes' : IDL.Func([], [IDL.Text], []),
    'xkcd' : IDL.Func([], [ManualReply], []),
    'xkcdTransform' : IDL.Func([HttpTransformArgs], [HttpResponse], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
