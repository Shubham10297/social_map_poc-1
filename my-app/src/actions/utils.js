export const makeBadge = (name) => {
    if(!name.length) return ""
    let nameArr =  name.split(" ");
    if (nameArr.length > 1) {
      return nameArr[0].charAt(0) + nameArr[1].charAt(0);
    }
    return nameArr[0].charAt(0);
  };
 
export const parseUserDataIntoNodesEdges = (OriginUser,data) => {
    const nodes = []; 
    const edges= [];
    if(!data.length && !OriginUser?.pk?.length){
        return {nodes , edges};
    }
    nodes.push(
        {
        id: +OriginUser?.pk,
        label: OriginUser?.full_name,
        title: OriginUser?.username,
        color: '#'+Math.floor(Math.random()*16777215).toString(16)
    })
    for(const item of data){
        if(!item.is_private){
            nodes.push(
                {
                id: +item?.pk,
                label: item?.full_name,
                title: item?.username ,
                color: '#'+Math.floor(Math.random()*16777215).toString(16)
            })
            edges.push(
                { 
                    from: +OriginUser?.pk, 
                    to: +item?.pk 
                });
        }
         
    }
    return { nodes, edges };
} 