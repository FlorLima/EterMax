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

        if(this.DoesSongExist(list, newSong) == -1){
            console.log(`Adding new song to ${list.name}`);
            this.repository.AddSong(name, newSong);
            return  {status: true, errors: null};
        }else{
            return {status: false , errors: "The song already exists inside the list"};
        }
    }

    DeleteSong(name, song){
        let validationRes = this.listValidator.RunValidations({name: name});
        if(validationRes){
            return {status: false, errors: validationRes}
        }

        let foundList = this.repository.Find(name);
        if(foundList == null){
            return {status: false, errors: "The list name doesn't exist."}
        }
        let songExist = this.DoesSongExist(foundList, song);
        if(songExist == -1){
            return {status: false, errors:`The song doesn't belong to ${foundList.name} list`}
        }

        let deletedItem = this.repository.DeleteSong(name, song);
        return {status: true, deletedItem: deletedItem}
    }

    // GetLists(){
    //     return {status: true, lists: this.repository.GetLists()};
    // }
    GetLists(song){
        
        if(!song || Object.keys(song).length === 0){
            console.log("no query")
            return {status: true, lists: this.repository.GetLists()};
        }

        let lists = this.repository.GetLists();
        if(!lists){
            return {status: false, errors: "There are no lists"};
        }

        let foundLists = []
        for (const listIndex in lists) {
            if(this.DoesSongExist(lists[listIndex], song) != -1){
                foundLists.push(lists[listIndex].name);
            }
        }
        console.log(foundLists)
        return {status: true, lists: foundLists};

    }
    DoesSongExist(list, newSong){
        for (const songIndex in list.songs) {
            let currSong = list.songs[songIndex]
            if (currSong.title === newSong.title && currSong.artist === newSong.artist && currSong.album === newSong.album) {
                console.log(`Found!`)
                return songIndex;
            }
        }
        return -1;
    }
}

module.exports = ListService;