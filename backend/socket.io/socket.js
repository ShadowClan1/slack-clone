class socketHash {
constructor () {
    this.hashMap = new Map()
}

setId (key_id, value_id) {
    this.hashMap.set(key_id, value_id)
}

getId(key_id){
    return this.hashMap.get(key_id)
}


}



module.exports = socketHash ;