var zpiMeta = require('./lib/defs/zcl_meta.json'),
    Enum = require('light-enum'),
    zclDefs = require('./lib/defs/zcl_defs.json')
var paramsType = new Enum(zclDefs.ParamType)

function process1(params){
    var output = []
    for(var i in params){
        var p = params[i]
        if(p instanceof Array) output.push(p)
        else output.push([Object.keys(p)[0], Object.values(p)[0]])
    }
    return output
}

function process(params){
    params = process1(params)
    for(var i in params){
        var r = params[i]
        var got = paramsType.get(r[1])
        if(got) r[1] = got.value
        else console.log(r[1])
    }
    return params
}

let subsys = zpiMeta.foundation
for(let cmdName in subsys){
    let cmd = subsys[cmdName]
    cmd.params = process(cmd.params)
}

for(var i in zpiMeta.functional){
    let subsys = zpiMeta.functional[i]
    for(let cmdName in subsys){
        let cmd = subsys[cmdName]
        cmd.params = process(cmd.params)
    }
}



console.log(JSON.stringify(zpiMeta))