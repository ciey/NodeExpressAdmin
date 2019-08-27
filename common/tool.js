function resolvSelectJson(result, node) {
    const data = [];
    node.forEach(item => {
        let prefix = "";
        for (let i = 0; i < item.level; i++) {
            prefix += "　　";
        }
        data.push({
            id: item.id,
            name: prefix + item.name
        })
        if (result[item.id]) {
            let ret = resolvSelectJson(result, result[item.id]);
            ret.forEach(item => {
                let prefix = "";
                for (let i = 0; i < item.level; i++) {
                    prefix += "　　";
                }
                data.push({
                    id: item.id,
                    name: prefix + item.name
                });
            })
        }
    });
    return data;
}

exports.resolvSelectJson = resolvSelectJson;