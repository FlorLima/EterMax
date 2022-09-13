const SongList = require("../../api/models/SongList");

class ListService{

    constructor(repository){
        this.repository = repository;
    }

    AddList(name){
        //Check the param name
        let lists = this.repository.GetLists();
        if(!lists.hasOwnProperty(name)){
            this.repository.AddList(name);
            return true;
        }
        return false;
    }

    DeleteList(name){
        let lists = this.repository.GetLists();
        //Delete a list
        if(lists.hasOwnProperty(name)){
            return this.repository.DeleteList(name);
        }
        return null;
    }

    AddSong(name, newSong){
        console.log(`${name} ${newSong}`)
        //this will add a song to a list
        let lists = this.repository.GetLists();
        if(lists.hasOwnProperty(name)){
            this.repository.AddSong(name, newSong);
            return true;
        }else{
            return false;
        }
    }

    GetLists(){
        return this.repository.GetLists();
    }
}

module.exports = ListService;