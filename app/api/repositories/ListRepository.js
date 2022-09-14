const SongList = require("../models/SongList");
//supposing that title & artist & album(song) and name(list) are key.
class ListRepository{

    constructor(){
        this.lists = [];
    }

    AddSong(name, newSong){
        let index = this.FindIndex(name);
        //this will add a song to a list
        this.lists[index].songs.push(newSong);
    }

    DeleteSong(name, currSong){
        //delete existing song from a list
        for (const listInd in this.lists) {
            if(this.lists[listInd].name == name){
                for(const songInd in this.lists[listInd].songs){
                    
                    let nextSong = this.lists[listInd].songs[songInd];
                    if (currSong.title ==  nextSong.title && currSong.artist == nextSong.artist && currSong.album == nextSong.album) {
                        this.lists[listInd].songs.splice(songInd, 1);
                        return nextSong;
                    }
                }
            }
        } 

        return null;
    }

    Find(name){
        
        for (const list in this.lists) {
            if(this.lists[list].name == name){
                console.log(`Found element`);
                console.log(this.lists[list])
                return this.lists[list];
            }
        }   
       return null;
    }
    //helper methods
    FindIndex(name){
        for (const list in this.lists) {
            if(this.lists[list].name == name){
                console.log(`Found index`);
                return list;
            }
        }   
       return -1;
    }
    AddList(name){
        //this will create a new list
        this.lists.push(new SongList(name));
        
    }
    
    DeleteList(name){
        let index = this.FindIndex(name);
        //Delete a list
        let deletedSong = this.lists[index];
        this.lists.splice(index, 1);
        return deletedSong;
    }

    GetLists(){
        return this.lists;
    }
}


module.exports = ListRepository;