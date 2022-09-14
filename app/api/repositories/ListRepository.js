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

    DeleteSong(name, idSong){
        //delete existing song from a list
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
        delete this.lists[index];
        return deletedSong;
    }

    GetLists(){
        return this.lists;
    }
}


module.exports = ListRepository;