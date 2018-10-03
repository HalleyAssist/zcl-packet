var zpiMeta = require('./lib/defs/zcl_meta.json')

function process(params){
    var output = []
    for(var i in params){
        var p = params[i]
        output.push([Object.keys(p)[0], Object.values(p)[0]])
    }
    return output
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