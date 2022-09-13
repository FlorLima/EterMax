const SongList = require("../models/SongList");
//supposing that title(song) and name(list) are key.
class ListRepository{

    constructor(){
        this.lists = {};
    }

    AddSong(name, newSong){
        //this will add a song to a list
        this.lists[name].songs.push(newSong);
    }
    DeleteSong(name, idSong){
        //delete existing song from a list
    }

    GetLists(){
       return this.lists;
    }

    AddList(name){
        //this will create a new list
        this.lists[name] = (new SongList(name));
        
    }
    
    DeleteList(name){
        //Delete a list
        let deletedSong = this.lists[name];
        delete this.lists[name];
        return deletedSong;
    }
}


module.exports = ListRepository;