 function map(array, callback){
    const mapped = []
    for(let i = 0; array.length; i++){
        const element = array[i]

        mapped[i] = callback(element)
    }
 }