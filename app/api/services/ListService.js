const SongList = require("../../api/models/SongList");
/**
 * Assuming that title & artist & album are unique identier for a single song.
 * Assuming that name is unique identifier for a single list.
 */
class ListService{

    constructor(repository, songVal, listVal){
        this.repository = repository;
        this.songValidator = songVal;
        this.listValidator = listVal;
    }

    AddList(name){
        let listValidationResult = this.listValidator.RunValidations({name: name});
        //sanitize data
        if(listValidationResult){
            return {status: false, errors: listValidationResult};
        }
        //business logic
        let list = this.repository.Find(name);


        if(list != null){
            return { status: false, errors: "That list name already exists!\n"};
        }

        this.repository.AddList(name);
        return { status: true, errors: null };
    }

    DeleteList(name){
        
        let listValidationResult = this.listValidator.RunValidations({name: name});
        
        if(listValidationResult){
            return {status: false, errors: listValidationResult}
        }

        let list = this.repository.Find(name);
        if(list == null){
            return {status: false, errors: `The ${name} list doesn't exist`};
        }

        //Delete a list
        let result =  this.repository.DeleteList(name);
        return {status: true, deletedItem: result};
    }

    AddSong(name, newSong){
        //sanitize input
        let songValidationsResult = this.songValidator.RunValidations(newSong);
        let listValidationResult = this.listValidator.RunValidations({name: name});

        if(songValidationsResult){
           return {status: false, errors: songValidationsResult}
        }

        if(listValidationResult){
            return {status: false, errors: listValidationResult}
        }

        //business logic
        let list = this.repository.Find(name);
        
        if(list == null){
            return {status: false, errors: "The list name was not found\n"};
        }

        if(!this.DoesSongExist(list, newSong)){
            console.log(`Adding new song to ${list.name}`);
            this.repository.AddSong(name, newSong);
            return  {status: true, errors: null};
        }else{
            return {status: false , errors: "The song already exists inside the list"};
        }
    }

    GetLists(){
        return {status: true, lists: this.repository.GetLists()};
    }

    DoesSongExist(list, newSong){
        for (const songIndex in list.songs) {
            let currSong = list.songs[songIndex]
            if (currSong.title == newSong.title && currSong.artist == newSong.artist && currSong.album == newSong.album) {
                return true;
            }
        }
        return false;
    }
}

module.exports = ListService;