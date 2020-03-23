function meanGroups(a) {
    let i,
    finalArray = [],
    meanArray = [];

    function calculateMean(array) {
        let total = 0;

        array.forEach(element => {
            total += element;
        })

        return (total / array.length)
    }

    for(i = 0; i < a.length; i++) {
        meanArray.push(calculateMean(a[i]));        
    }

    for(i = 0; i < meanArray.length; i++) {
        let matches=[]
        for(index = i; index < meanArray.length; i++) {
            console.log(index);
            // if(meanArray[index] === meanArray[i]) {
            //     matches.push(index);
            // } else {
            //     //finalArray.push([i])
            // }
            // console.log(matches);
            
        }  
        finalArray.push(matches);
    }
    //console.log(finalArray);
}

console.log(meanGroups([[3, 3, 4, 2],
    [4, 4],
    [4, 0, 3, 3],
    [2, 3],
    [3, 3, 3]]));